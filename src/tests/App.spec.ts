import {Application} from 'lakutata'
import { TestOrmComponent } from '../components/TestOrmComponent'
import {Configuration} from '../config/Config'
import { BuildEntrypoints, BuildHTTPEntrypoint, HTTPContext } from 'lakutata/com/entrypoint'
import { TestController } from '../controllers/TestController'
import Fastify from 'fastify'
import { As } from 'lakutata/helper'

Application
    .env({TEST: '123'})
    .run(() => ({
        id: 'test.app',
        name: 'TestApp',
        timezone: 'auto',
        components:{
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
                                        data: {...As<Record<string, string>>(request.query ? request.query : {}), ...As<Record<string, string>>(request.body ? request.body : {})}
                                    }), ac)
                                }
                            })
                        })
                    })
                    fastify.listen({port: 3000, host: '0.0.0.0'})
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
    }))
    .alias({
    }, true)
    .onLaunched(async (app, log) => {
        log.info('Application %s launched', app.appName)
    })
    .onDone(async (app, log) => {
        log.info('Application %s done', app.appName)
    })
    .onFatalException((error, log) => {
        log.error('Application error: %s', error.message)
        return 100
    })