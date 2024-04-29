import { DTO } from "lakutata"
import { Expect } from "lakutata/decorator/dto"

export class BaseDTO extends DTO{
    @Expect(DTO.String().required())
    public id: string

    @Expect(DTO.String().required())
    public createdBy: string

}