import { DataBaseConfig } from "./DataBaseConfig";
import { DatabaseType } from "../lib/enum/DataBaseType";
import { ApplicationOptions } from "lakutata";
import { BuildCLIEntrypoint, BuildEntrypoints, BuildHTTPEntrypoint, BuildServiceEntrypoint, CLIContext, HTTPContext, ServiceContext } from "lakutata/com/entrypoint";
import { TestController } from "../controllers/TestController";
import { TestOrmComponent } from '../components/TestOrmComponent'
import Fastify from 'fastify'
import { As, DevNull } from 'lakutata/helper'
import { Database } from "lakutata/com/database";
import path from "path";
import { TestAliasComponent } from "../components/TestAliasComponent";
import { EmitEventComponent } from "../components/EmitEventComponet";
import { createInterface } from "readline";
import { Command } from "commander";
import { createServer } from "node:http";
import { Server as SocketIOServer } from "socket.io"


export class Configuration {

    protected options: {
        id: string;
        /**
         * AppName
         */
        name: string;
        /**
         * Application timezone
         */
        timezone?: string | 'auto';
        /**
         * runtime environment (development or production, default value is development)
         */
        mode?: 'development' | 'production';

        isProd: boolean
    }

    constructor(isProd: boolean = false) {
        this.options = {
            id: 'test.app',
            name: 'test.app',
            mode: isProd ? 'production' : 'development',
            timezone: 'auto',
            isProd: isProd
        }
    }

    public config(): ApplicationOptions {
        return {
            id: this.options.id,
            name: this.options.name,
            timezone: this.options.timezone,
            components: {
                db: {
                    class: Database,
                    options: DataBaseConfig(this.options.isProd, DatabaseType.MYSQL)
                },
                testOrmCompoment: {
                    class: TestOrmComponent
                },
                testAliasComponent: {
                    class: TestAliasComponent
                },
                emitEventComponent: {
                    class: EmitEventComponent
                },
                entrypoint: BuildEntrypoints({
                    controllers: [
                        TestController
                    ],
                    http: BuildHTTPEntrypoint((module, routeMap, handler, onDestroy) => {
                        const fastify = Fastify({
                            logger: false
                        })
                        routeMap.forEach((methods: Set<any>, route: string) => {
                            methods.forEach(method => {
                                fastify.route({
                                    url: route,
                                    method: method,
                                    handler: async (request, reply) => {
                                        const ac = new AbortController()
                                        reply.raw.on('close', () => {
                                            console.log('close')
                                            ac.abort()
                                        })
                                        return await handler(new HTTPContext({
                                            route: request.routeOptions.url!,
                                            method: request.method,
                                            request: request.raw,
                                            response: reply.raw,
                                            data: { ...As<Record<string, string>>(request.query ? request.query : {}), ...As<Record<string, string>>(request.body ? request.body : {}) }
                                        }), ac)
                                    }
                                })
                            })
                        })
                        fastify.listen({ port: 3000, host: '0.0.0.0' })
                        onDestroy(async () => {
                            await fastify.close()
                        })
                    }),
                    cli: BuildCLIEntrypoint((module, cliMap, handler, onDestroy) => {
                        const inf = createInterface({
                            input: process.stdin,
                            output: process.stdout
                        })
                            .on('SIGINT', () => process.exit(2))
                            .on('line', input => {
                                try {
                                    const CLIProgram: Command = new Command().exitOverride()
                                    cliMap.forEach((dtoJsonSchema, command: string) => {
                                        const cmd = new Command(command).exitOverride()
                                        for (const p in dtoJsonSchema.properties) {
                                            const attr = dtoJsonSchema.properties[p]
                                            cmd.option(`--${p} <${attr.type}>`, attr.description)
                                        }
                                        cmd.action(async (args) => {
                                            //Handle cli
                                            await handler(new CLIContext({ command: command, data: args }))
                                        })
                                        CLIProgram.addCommand(cmd)
                                    })
                                    CLIProgram.addCommand(new Command('exit').allowUnknownOption(true).action(() => process.exit()))
                                    CLIProgram.parse(input.split(' '), { from: 'user' })//使用命令行传入的参数进行执行
                                } catch (e: any) {
                                    DevNull(e)
                                }
                            })
                        onDestroy(() => {
                            inf.close()
                        })
                    }),
                    service: BuildServiceEntrypoint((module, handler, onDestroy) => {
                        const httpServer = createServer()
                        const server = new SocketIOServer(httpServer, {
                            cors: {
                                origin: '*',
                                methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
                            }
                        })
                        server.on('connection', socket => {
                            socket
                                .on('message', async (data, fn) => {
                                    try {
                                        const content = new ServiceContext({
                                            data: data
                                        })
                                        const result = await handler(content)
                                        if (fn) {
                                            fn(result)
                                        } else {
                                            socket.emit('response', result)
                                        }
                                    } catch (e) {
                                        socket.emit('error', e)
                                    }
                                })
                                .on('disconnect', async (e) => {
                                })
                                .on('ping', async (args) => {
                                    console.log('接收到ping')
                                })
                                .conn.on('packet', async () => {
                                    //接收到ping
                                    console.log('接收到心跳包')
                                })
                        })
                        httpServer.listen(3001)
                        onDestroy(async () => {
                            server.close()
                        })
                    })
                }),
            },
            bootstrap: [
                // 'testModule',
                // 'testComponent',
                // 'testProvider',
                'entrypoint'
            ]
        }
    }

    public loadAlise() {
        return {
            '@rootPath': path.resolve(__dirname, './file'),
            '@xml': '@rootPath/xml'
        }
    }
}