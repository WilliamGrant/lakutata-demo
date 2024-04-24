import { Component } from "lakutata";
import { Database } from "lakutata/com/database";
import { Logger } from "lakutata/com/logger";
import { Inject } from "lakutata/decorator/di";
import { User } from "../entities/db/User";
import { EmitEventComponent } from "./EmitEventComponet";
export class TestOrmComponent extends Component{
    
    @Inject()
    protected readonly log: Logger

    @Inject('db')
    protected readonly db:Database

    /**
     * if you want todo something when compoment initlization, please wirte here
     */
    @Inject('emitEventComponent')
    protected readonly emitInstance: EmitEventComponent
  
    protected async init(): Promise<void> {
      console.log('TestOrmComponent init!')

      //listen other component emit event msg
      this.emitInstance.addListener('testEmitEvent', (res) => {
        console.log('TestOrmComponent Listener:', res)
      })
    }

    public async get(){
        const data= await this.db.getRepository(User).findAndCount()
        console.log('data',data)
    }
}