import { Application } from 'lakutata'
import { Configuration } from '../config/Config'
import path from 'path'

const configuration = new Configuration()

Application
    .env({ TEST: '123' })
    .run(configuration.config())
    .alias({
        '@rootPath': path.resolve(__dirname, './file'),
        '@xml': '@rootPath/xml'
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
