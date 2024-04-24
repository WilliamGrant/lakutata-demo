import { DataSource, DataSourceOptions } from "lakutata/orm";
import { DataBaseConfig } from "./DataBaseConfig";
import { DatabaseType } from "../lib/enum/DataBaseType";
import { ApplicationOptions } from "lakutata";
import { BuildEntrypoints, BuildHTTPEntrypoint, HTTPContext } from "lakutata/com/entrypoint";
import { TestController } from "../controllers/TestController";
import { TestOrmComponent } from '../components/TestOrmComponent'
import Fastify from 'fastify'
import { As } from 'lakutata/helper'
import { Database } from "lakutata/com/database";
import path from "path";
import { TestAliasComponent } from "../components/TestAliasComponent";
import { EmitEventComponent } from "../components/EmitEventComponet";


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
                testAliasComponent:{
                    class:TestAliasComponent
                },
                emitEventComponent:{
                    class:EmitEventComponent
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