import { DTO } from "lakutata"
import { Expect } from "lakutata/decorator/dto"

export class TestDTO extends DTO {
    @Expect(DTO.String().optional())
    public aaa: string

    @Expect(DTO.Number().required().strict(false).description('hahahaha'))
    public bbb: number
}