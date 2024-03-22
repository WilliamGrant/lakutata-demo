import {Application} from 'lakutata'
import { TestOrmComponent } from '../components/TestOrmComponent'
import {Configuration} from '../config/Config'
Application
    .env({TEST: '123'})
    .run(() => ({
        id: 'test.app',
        name: 'TestApp',
        timezone: 'auto',
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