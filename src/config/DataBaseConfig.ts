import { DataSourceOptions } from "lakutata/orm"
import path from 'path'
import { DatabaseType } from "../lib/enum/DataBaseType"
import * as entities from "../entities"

export function DataBaseConfig(isProd: boolean, type: DatabaseType): DataSourceOptions {
    const database: string = process.env.MYSQL_DB ? process.env.MYSQL_DB : 'test'
    const host: string | undefined = process.env.MYSQL_HOST ? process.env.MYSQL_HOST : isProd ? undefined : '192.168.0.145'
    const port: number = parseInt(process.env.MYSQL_PORT ? process.env.MYSQL_PORT : '3306')
    const username: string | undefined = process.env.MYSQL_USERNAME ? process.env.MYSQL_USERNAME : isProd ? undefined : 'root'
    const password: string | undefined = process.env.MYSQL_PASSWORD ? process.env.MYSQL_PASSWORD : isProd ? undefined : '20160329'

    let configOption: DataSourceOptions = {
        name: 'default',
        type: 'mysql',
        database: database,
        // logger: new ORMLogger(),
        // logging: ['query', 'error'],
        entities: Object.values(entities),
        migrations: ['../migration/*.{js,ts}'],
        synchronize: true,
        host: host,
        port: port,
        username: username,
        password: password
    }
    return configOption
}