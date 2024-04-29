import { DTO } from "lakutata"
import { Expect } from "lakutata/decorator/dto"
import { CreateDTO } from "./CreateDTO"

export class UpdateDTO extends CreateDTO{
    @Expect(DTO.String().optional())
    public updatedAt: Date

    @Expect(DTO.String().optional())
    public updatedBy: string

}