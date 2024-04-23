import { Column, UpdateDateColumn } from 'lakutata/decorator/orm'
import {CreateEntityProperty} from './CreateEntityProperty'

export class UpdateEntityProperty extends CreateEntityProperty {
    @UpdateDateColumn()
    public updatedAt: Date

    @Column({default: ''})
    public updatedBy: string

}