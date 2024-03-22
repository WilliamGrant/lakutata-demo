import { Column, CreateDateColumn } from 'lakutata/decorator/orm'
import {BaseEntityProperty} from './BaseEntityProperty'

export class CreateEntityProperty extends BaseEntityProperty {
    @CreateDateColumn()
    public createdAt: Date

    @Column({default: ''})
    public createdBy: string

}