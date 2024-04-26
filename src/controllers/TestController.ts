import { type ActionPattern, Application } from "lakutata";
import { ContextType, Controller } from "lakutata/com/entrypoint";
import { Logger } from "lakutata/com/logger";
import { CLIAction, HTTPAction, ServiceAction } from "lakutata/decorator/ctrl";
import { Inject } from "lakutata/decorator/di";
import { TestDTO } from "../lib/dto/TestDTO";
import { TestOrmComponent } from "../components/TestOrmComponent";
import { TestAliasComponent } from "../components/TestAliasComponent";
import { EmitEventComponent } from "../components/EmitEventComponet";
import { CliTestDTO } from "../lib/dto/CliTestDTO";
import { Before } from "lakutata/decorator/asst";
import { AuthComponent } from "../components/AuthComponent";

export class TestController extends Controller {

    @Inject()
    protected readonly log: Logger

    @Inject(Application)
    protected readonly app: Application

    @Inject('testOrmCompoment')
    protected readonly testOrm: TestOrmComponent

    @Inject('testAliasComponent')
    protected readonly testAlias: TestAliasComponent


    @Inject('emitEventComponent')
    protected readonly emitEvent: EmitEventComponent

    protected async init(): Promise<void> {
        this.log.info(this.app.appName, 'init')
    }

    protected async destroy(): Promise<void> {
        console.log(this.app.appName, 'destroyed')
    }

    @HTTPAction('/test', 'GET')
    public async test() {
        return 'this test action!'
    }


    @HTTPAction('/test2', 'POST', TestDTO)
    public async test2(ipn: ActionPattern<TestDTO>) {
        return 'Validate success!'
    }

    @CLIAction('test3', CliTestDTO)
    public async test3(inp: ActionPattern<CliTestDTO>) {
        if (this.context.type === ContextType.CLI) console.log('cli!')
        console.log(inp, this.context.type)
        return 'oh!!!!!!!!!!' + this.getEnv('TEST', 'abcd')
    }


    @HTTPAction('/testOrmMethod', 'GET')
    public async testOrmMethod() {
        return await this.testOrm.get()
    }

    @HTTPAction('/testAlias', 'GET')
    public async testAliasMethod() {
        return await this.testAlias.getPath()
    }

    @HTTPAction('/testEmit', 'GET')
    public async testEmitMethod() {
        return await this.emitEvent.testEmit()
    }


    @ServiceAction({
        act: 'test',
        method: 'test5'
    })
    public async test5(inp: ActionPattern<TestDTO>) {
        console.log('test5', inp)
        return '5555'
    }

    @HTTPAction('/test6', 'GET')
    @Before(AuthComponent.isAuthenticated)
    public async test6(inp: ActionPattern<TestDTO>) {
        console.log('test6', inp)
        return '6666'
    }
}