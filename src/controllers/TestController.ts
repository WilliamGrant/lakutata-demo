import { type ActionPattern, Application } from "lakutata";
import { ContextType, Controller } from "lakutata/com/entrypoint";
import { Logger } from "lakutata/com/logger";
import { CLIAction, HTTPAction, ServiceAction } from "lakutata/decorator/ctrl";
import { Inject } from "lakutata/decorator/di";
import { TestDTO } from "../lib/dto/TestDTO";
import { TestOrmComponent } from "../components/TestOrmComponent";

export class TestController extends Controller {

    @Inject()
    protected readonly log: Logger

    @Inject(Application)
    protected readonly app: Application

    @Inject('testOrmCompoment')
    protected readonly testOrmCompoment:TestOrmComponent

    protected async init(): Promise<void> {
        this.log.info(this.app.appName, 'init')
    }

    protected async destroy(): Promise<void> {
        console.log(this.app.appName, 'destroyed')
    }

    @HTTPAction('/test', 'GET')
    public async test(){
        return 'this test action!'
    }

    @HTTPAction('/test/:id', ['GET', 'POST'], TestDTO)
    @CLIAction('test3', TestDTO)
    @ServiceAction({
        act: 'test3',
        bbc: {
            abc: true,
            ccc: 1
        }
    })
    public async test3(inp: ActionPattern<TestDTO>) {
        if (this.context.type === ContextType.CLI) console.log('cli!')
        console.log(inp, this.context.type)

        // //Reload app
        // setTimeout(() => {
        //     this.app.reload()
        // }, 1000)

        // if (this.context.type === ContextType.HTTP) {
        //     console.log(isProxy(As<HTTPContext>(this.context).response))
        //     As<HTTPContext>(this.context).response.write(new Time().format())
        //     As<HTTPContext>(this.context).response.end()
        // } else {
        //     // await Delay(3000)
        //     return 'oh!!!!!!!!!!'
        // }
        return 'oh!!!!!!!!!!' + this.getEnv('TEST', 'abcd')
    }


    @HTTPAction('/testOrmMethod', 'GET')
    public async testOrmMethod(){
        return await this.testOrmCompoment.get()
    }
}