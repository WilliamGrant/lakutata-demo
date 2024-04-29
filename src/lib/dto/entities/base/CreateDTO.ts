import { Expect } from 'lakutata/decorator/dto'
import {DTO} from 'lakutata'
import { BaseDTO } from './BaseDTO'

export class CreateDTO extends BaseDTO{

    @Expect(DTO.String().optional())
    public createdAt: Date

    @Expect(DTO.String().optional())
    public createdBy: string

}