import { Column, Entity } from "lakutata/decorator/orm";
import { UpdateEntityProperty } from "../base/UpdateEntityProperty";

@Entity()
export class User extends UpdateEntityProperty{

    @Column({type: 'varchar', length: 50, comment: '用户名'})
    public name: string

    @Column({type: 'varchar', length: 200, comment: 'avatar'})
    public avatar: string

    @Column({type: 'varchar', length: 50, comment: 'password'})
    public password: string
}