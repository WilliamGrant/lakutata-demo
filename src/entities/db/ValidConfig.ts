import { Column, Entity } from "lakutata/decorator/orm";
import {UpdateEntityProperty} from '../base/UpdateEntityProperty'

@Entity()
export class ValidConfig extends UpdateEntityProperty {
    @Column({type: 'varchar', length: 255, comment: '配置项名'})
    public key: string

    @Column({type: 'text', comment: '配置项值'})
    public value: string

    @Column({type: 'varchar', length: 50, comment: '配置项类型'})
    public type: string

    @Column({type: 'text', nullable: true, comment: '配置项说明'})
    public comment: string

}