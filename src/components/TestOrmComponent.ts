import { Component } from "lakutata";
import { Database } from "lakutata/com/database";
import { Logger } from "lakutata/com/logger";
import { Inject } from "lakutata/decorator/di";
import { DataSource } from "lakutata/orm";
import { User } from "../entities/db/User";
export class TestOrmComponent extends Component{
    

    @Inject()
    protected readonly log: Logger

    @Inject('db')
    protected readonly db:DataSource

    /**
     * if you want todo something when compoment initlization, please wirte here
     */
    protected async init(): Promise<void> {
        this.log.info('TestComponent initialized')
    }

    public async get(){
        const data= await this.db.getRepository(User).findAndCount()
        console.log('data',data)
    }
}