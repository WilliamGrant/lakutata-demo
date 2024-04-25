import { DTO } from "lakutata"
import { Expect } from "lakutata/decorator/dto"

export class CliTestDTO extends DTO {
    @Expect(DTO.String().required())
    public id: string

    @Expect(DTO.Number().required().strict(false).description('please input number'))
    public count: number
}