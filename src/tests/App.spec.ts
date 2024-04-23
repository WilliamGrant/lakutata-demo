import { Application } from 'lakutata'
import { Configuration } from '../config/Config'


Application
    .env({ TEST: '123' })
    .run( new Configuration().config())
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
