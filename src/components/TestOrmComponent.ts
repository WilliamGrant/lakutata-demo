import { Component } from "lakutata";
import { Database } from "lakutata/com/database";
import { Logger } from "lakutata/com/logger";
import { Inject } from "lakutata/decorator/di";
import { User } from "../entities/db/User";
import { EmitEventComponent } from "./EmitEventComponet";
import { InterfaceInfo } from "../entities";
import { InterfaceInfoDTO } from "../lib/dto/entities/InterfaceInfoDTO";

export class TestOrmComponent extends Component {

  @Inject()
  protected readonly log: Logger

  @Inject('db')
  protected readonly db: Database
  /**
   * if you want todo something when compoment initlization, please wirte here
   */
  @Inject('emitEventComponent')
  protected readonly emitInstance: EmitEventComponent

  @Inject('db', function (db) {
    return db.getRepository(InterfaceInfo)
  })
  public InterfaceRespostry: any



  protected async init(): Promise<void> {
    console.log('TestOrmComponent init!')

    //listen other component emit event msg
    this.emitInstance.addListener('testEmitEvent', (res) => {
      console.log('TestOrmComponent Listener:', res)
    })
  }

  public async get() {
    const data = await this.db.getRepository(User).findAndCount()
    console.log('data', data)
  }

  public async sh() {
    const data = await this.InterfaceRespostry.findAndCount({})
    console.log('sh test', data)
  }
}