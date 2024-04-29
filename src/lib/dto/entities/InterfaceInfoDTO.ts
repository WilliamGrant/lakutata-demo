import { DTO } from "lakutata"
import { Expect } from "lakutata/decorator/dto"
import { UpdateDTO } from "./base/UpdateDTO"

export class InterfaceInfoDTO extends UpdateDTO {

    /**
     * 服务ID
     */
    @Expect(DTO.String().required())
    public serviceId: string

    /**
     * 接口方法名
     */
    @Expect(DTO.String().required())
    public action: string

    /**
     * 接口路径
     */
    @Expect(DTO.String().required())
    public path: string

    /**
     * 接口参数
     */
    @Expect(DTO.String().optional())
    public pattern?: any

    /**
     * 是否公共接口
     */
    @Expect(DTO.Boolean().default(true).optional())
    public isPublic: boolean

    /**
     * 是否系统接口
     */
    @Expect(DTO.Boolean().default(false).optional())
    public isSystem: boolean

    /**
     * 访问链ID集合(有先后顺序)
     */
    @Expect(DTO.String().optional())
    public serial: string

    /**
     * 返回结果集处理脚本
     */
    @Expect(DTO.String().optional())
    public transform: string

    /**
     * 是否启用该访问链路(默认启用)
     */
    @Expect(DTO.Boolean().default(true).optional())
    public enable: boolean

    /**
     * 备注
     */
    @Expect(DTO.String().optional())
    public remarks?: string
}