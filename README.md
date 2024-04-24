<div align="center">

![lakutata](https://socialify.git.ci/lakutata/lakutata/image?description=1&descriptionEditable=An%20IoC-based%20universal%20application%20framework&font=Source%20Code%20Pro&forks=1&language=1&logo=https%3A%2F%2Fraw.githubusercontent.com%2Flakutata%2Flakutata%2Fmain%2Fassets%2Flogo.svg&name=1&pattern=Circuit%20Board&stargazers=1&theme=Auto)

</div>

<div align="center">

![node-lts](https://img.shields.io/node/v-lts/lakutata?style=for-the-badge&logo=nodedotjs&color=rgb(128%2C189%2C65))
![npm](https://img.shields.io/npm/v/lakutata?style=for-the-badge&logo=npm&color=rgb(128%2C189%2C65))
![npm](https://img.shields.io/npm/dm/lakutata?style=for-the-badge&logo=npm&color=rgb(128%2C189%2C65))
![NPM](https://img.shields.io/npm/l/lakutata?style=for-the-badge&logo=github&color=rgb(128%2C189%2C65))
![Codacy grade](https://img.shields.io/codacy/grade/0f16d1c355494415ad7733f8f22f7d36?style=for-the-badge&logo=codacy)

</div>

## 💫 Description

Lakutata is a generic development framework written in TypeScript and designed with IoC principles. Its main objective
is to provide a universal, efficient, and stable development framework. The design goals of Lakutata are not limited to
web application development; it aims to serve as a foundational framework for desktop applications, embedded systems
applications, and web applications. The framework primarily adopts an OOP (Object-Oriented Programming) approach and
encapsulates functionalities such as subprocesses, threads, permission management, and database ORM, enabling the
framework to be used out of the box.

In addition, Lakutata also supports the integration of third-party libraries into the application, allowing developers
to freely encapsulate and call third-party modules using Lakutata's dependency injection.

## 💫 Framework core

![lakutata core](/doc/assets/images/lakutata_core.png)

lakutata framework the core of main contents include: application instance objects, application components, containers, and modules,such like the picture. and alias、 proveder、dto、time is suport

## 1.Interduce

1. Application
2. Component
3. Contrainer
4. Module
5. Alias
6. Provider
7. DTO
8. Time

### 1.1 descript
1. Application
Application is main Module,That Class base on Module Class,We can init it and inject the applicationton object into the DI container(rootContainer)

2. Component
Component extend by Provider class,Each component has its own internal container inside,The component provides communication methods between other components such as emit and listening methods.We put the same type of functionality method into the same component so that the instance of this component can be used after injection

3. Container
Dependency container include application、component、module、provider
![lakutata core](/doc/assets/images/container.png)
The container can inject not only objects within the framework but also some custom components or objects. Injection is achieved by declaring references.
```typescript
import { Component } from "lakutata";
import { Database } from "lakutata/com/database";
import { Logger } from "lakutata/com/logger";
import { Inject } from "lakutata/decorator/di";
import { DataSource } from "lakutata/orm";
import { User } from "../entities/db/User";
export class TestOrmComponent extends Component{
    

    @Inject()
    protected readonly log: Logger

    @Inject('db')
    protected readonly db:Database

    /**
     * if you want todo something when compoment initlization, please wirte here
     */
    protected async init(): Promise<void> {
        this.log.info('TestComponent initialized')
    }

    public async get(){
        const data= await this.db.getRepository(User).findAndCount()
        console.log('data',data)
    }
}
```
Declare a TestOrmComponent, and then add a declaration to the configuration to tell the system the configuration of this object.
```typescript

    public config(): ApplicationOptions {
        return {
            id: this.options.id,
            name: this.options.name,
            timezone: this.options.timezone,
            components: {
                db: {
                    class: Database,
                    options: DataBaseConfig(this.options.isProd, DatabaseType.MYSQL)
                },
                testOrmCompoment: {
                    class: TestOrmComponent
                },
              
            },
            bootstrap: [
                // 'testModule',
                // 'testComponent',
                // 'testProvider',
                'entrypoint'
            ]
        }
    }
```
the options component property name must the same as inject method name,if not wolud not be useful

4. Module
Module base on Component


5. Alias
Alias definition is used to specify the path and obtain a stable path address in the program,We usually define it when the program initializes the configuration,such like this:
```typescript
import { Application } from 'lakutata'
import { Configuration } from '../config/Config'
import path from 'path'

const configuration = new Configuration()

Application
    .env({ TEST: '123' })
    .run(configuration.config())
    .alias({
        '@rootPath': path.resolve(__dirname, './file'),
        '@xml': '@rootPath/xml'
    }, true)
    .onLaunched(async (app, log) => {
        log.info('Application %s launched', app.appName)
    })
    .onDone(async (app, log) => {
        log.info('Application %s done', app.appName)
    })
    .onFatalException((error, log) => {
        log.error('Application error: %s', error.message)
        return 100
    })

```
The Alise alias and the specified path are configured here. When running the application, we will get the correct path.
```typescript
import { Application, Component } from "lakutata";
import { Inject } from "lakutata/decorator/di";
export class TestAliasComponent extends Component {


    @Inject(Application)
    protected readonly app: Application

    public async getPath() {
        const path = this.app.alias.get('@xml')
        console.log('path',path)
    }
}
```
Use the alias of the app instance to get the path


6. Provider
The provider is responsible for providing methods to obtain basic objects and program running environment variables. For example, the env of the node process, we can add some custom env to the process.env
```typescript
import { Application } from 'lakutata'

Application
    .env({ TEST: '123' })
//after set env you can get in process.env
//process.env['TEST']
```


7. DTO
Dto is often used to verify whether structures and values meet requirements,you can used it for controller param,component,object,such like that:
```ts
    @HTTPAction('/test/:id', ['GET', 'POST'], TestDTO)
    @CLIAction('test3', TestDTO)
    @ServiceAction({
        act: 'test3',
        bbc: {
            abc: true,
            ccc: 1
        }
    })
    public async test3(inp: ActionPattern<TestDTO>) {
        if (this.context.type === ContextType.CLI) console.log('cli!')
        console.log(inp, this.context.type)
        return 'oh!!!!!!!!!!' + this.getEnv('TEST', 'abcd')
    }
```


8. Time
lakutata core lib include Time tool class.you can get application's uptime or import time lib inside your component or module.



## 💫 use

-   安装依赖

```bash
npm i lakutata
```
-   运行

```bash
npm install
```
### application init

We uselly init App begin from setting Application options.after initlization options finished,We will get the new application instance that needs to be configured.

```typescript
Application
    .env({ TEST: '123' })
    .run( new Configuration().config())
    .alias({
    }, true)
    .onLaunched(async (app, log) => {
        log.info('Application %s launched', app.appName)
    })
    .onDone(async (app, log) => {
        log.info('Application %s done', app.appName)
    })
    .onFatalException((error, log) => {
        log.error('Application error: %s', error.message)
        return 100
    })

```
there has five configure option by Application:components、bootstrap、providers、modules、objects.

Here we provide a [simple example](https://github.com/WilliamGrant/lakutata-demo)
