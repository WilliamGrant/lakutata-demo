import { DataSourceOptions } from "lakutata/orm";
import { DataBaseConfig } from "./DataBaseConfig";
import { DatabaseType } from "../lib/enum/DataBaseType";
export class Configuration{    

    public dataBaseConfig(isProd:boolean=true,type:DatabaseType=DatabaseType.MYSQL):DataSourceOptions{
        return DataBaseConfig(isProd,type)
    }
}