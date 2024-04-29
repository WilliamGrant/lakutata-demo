import { type ActionPattern, Application } from "lakutata";
import { ContextType, Controller } from "lakutata/com/entrypoint";
import { Logger } from "lakutata/com/logger";
import { CLIAction, HTTPAction, ServiceAction } from "lakutata/decorator/ctrl";
import { Inject } from "lakutata/decorator/di";
import { TestDTO } from "../lib/dto/http/TestDTO";
import { TestOrmComponent } from "../components/TestOrmComponent";
import { TestAliasComponent } from "../components/TestAliasComponent";
import { EmitEventComponent } from "../components/EmitEventComponet";
import { CliTestDTO } from "../lib/dto/cli/CliTestDTO";
import { Before } from "lakutata/decorator/asst";
import { AuthComponent } from "../components/AuthComponent";

export class DiController extends Controller {

    @Inject()
    protected readonly log: Logger

    @Inject(Application)
    protected readonly app: Application

    @Inject('authComponent')
    protected readonly authComponent: AuthComponent

    @Inject('testOrmCompoment')
    protected readonly testOrm: TestOrmComponent


    public async init(): Promise<void> {
        console.log('Autoload success!')
    }

    @HTTPAction('/test6', 'GET')
    @Before(AuthComponent.isAuthenticated)
    public async test6(inp: ActionPattern<TestDTO>) {
        console.log('test6 excueted')
        return '6666'
    }

    @HTTPAction('/testOrmComponent', 'GET')
    public async testOrmComponent(){
        this.testOrm.sh()
        return 'hehehehe'
    }
}