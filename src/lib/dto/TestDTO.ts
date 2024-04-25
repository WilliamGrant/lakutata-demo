import { DTO } from "lakutata"
import { Expect } from "lakutata/decorator/dto"

export class TestDTO extends DTO {
    @Expect(DTO.String().optional())
    public id: string

    @Expect(DTO.Number().required().strict(true).description('please input number'))
    public count: number
}