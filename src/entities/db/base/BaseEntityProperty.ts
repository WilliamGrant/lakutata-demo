import { Column, PrimaryGeneratedColumn } from 'lakutata/decorator/orm'
import {BaseEntity} from 'lakutata/orm'

export class BaseEntityProperty extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    public id: string

    @Column({default: ''})
    public createdBy: string

}