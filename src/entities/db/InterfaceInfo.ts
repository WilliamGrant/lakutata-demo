import { Column, Entity } from "lakutata/decorator/orm";
import {UpdateEntityProperty} from '../base/UpdateEntityProperty'

@Entity()
export class InterfaceInfo extends UpdateEntityProperty {

    @Column({type: 'varchar', length: 255, comment: '接口名称'})
    public name: string

    /**
     * 服务ID
     */
    @Column({type: 'varchar', nullable: true, length: 255, comment: '服务ID'})
    public serviceId: string

    /**
     * 接口方法名
     */
    @Column({type: 'varchar', length: 255, comment: '接口方法名'})
    public action: string

    /**
     * 接口路径
     */
    @Column({type: 'text', comment: '接口路径'})
    public path: string

    /**
     * 接口参数
     */
    @Column({type: 'json', nullable: true, comment: '接口参数'})
    public pattern?: any

    /**
     * 是否公共接口
     */
    @Column({type: 'boolean', default: false, comment: '是否公共接口'})
    public isPublic: boolean

    /**
     * 是否系统接口
     */
    @Column({type: 'boolean', default: false, comment: '是否系统接口'})
    public isSystem: boolean

    /**
     * 访问链ID集合(有先后顺序)
     */
    @Column({type: 'varchar', nullable: true, length: 255, comment: '访问链ID集合(有先后顺序)'})
    public serial: string

    /**
     * 返回结果集处理脚本
     */
    @Column({type: 'varchar', nullable: true, length: 255, comment: '返回结果集处理脚本'})
    public transform: string

    /**
     * 是否启用该访问链路(默认启用)
     */
    @Column({type: 'boolean', nullable: true, default: 0, comment: '是否启用'})
    public enable: boolean

    /**
     * 备注
     */
    @Column({type: 'text', nullable: true, comment: '备注'})
    public remarks?: string
}
