import { Logger,QueryRunner } from "lakutata/orm"

export class ORMLogger implements Logger {
    log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner): any {
        console.log(level, message)
    }

    logMigration(message: string, queryRunner?: QueryRunner): any {
        // console.log(message)
    }

    logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        console.log('logQuery',query)
    }

    logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        console.log('logQueryError',error, query)
    }

    logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
        console.log('logQueryError',time, query)
    }

    logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
        console.log(`SchemaBuild:`+message)
    }

    // 实现logger类的所有方法
}
