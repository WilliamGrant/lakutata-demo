import { Application, Component } from "lakutata";
import { Inject } from "lakutata/decorator/di";
export class TestAliasComponent extends Component {


    @Inject(Application)
    protected readonly app: Application

    public async getPath() {
        const path = this.app.alias.get('@xml')
        console.log('path',path)
    }
}