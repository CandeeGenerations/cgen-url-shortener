import {join} from 'path'
import {ConfigModule} from '@nestjs/config'
import {ServeStaticModule} from '@nestjs/serve-static'
import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common'

import {AppService} from './services/app.service'
import {AuthMiddleware} from '../../auth/auth.middleware'
import {AppController} from './controllers/app.controller'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../..', 'client/build'),
      exclude: ['/api*'],
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    })
  }
}
