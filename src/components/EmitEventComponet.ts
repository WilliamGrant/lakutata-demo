import { Component } from "lakutata";
export class EmitEventComponent extends Component {

    public async testEmit() {
       this.emit('testEmitEvent',{
            methodName:'getPath'
       })
    }
}