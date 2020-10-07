import {join} from 'path'
import * as morgan from 'morgan'
import {ConfigModule} from '@nestjs/config'
import {ServeStaticModule} from '@nestjs/serve-static'
import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common'

import {logProviders, getLogger} from './logging'
import {AuthModule} from './modules/auth/auth.module'
import {AuthMiddleware} from './auth/auth.middleware'
import {enableDebugLogging} from './logging/constants'
import {ClickModule} from './modules/click/click.module'
import {AppController} from './controllers/app.controller'
import {AuthService} from './modules/auth/services/auth.service'
import {ShortUrlModule} from './modules/shortUrl/shortUrl.module'
import {ClickService} from './modules/click/services/click.service'
import {ShortUrlService} from './modules/shortUrl/services/shortUrl.service'

const {NODE_ENV} = process.env

const morganLogger = getLogger()
const morganLogStream = {
  write: (message: string): void => {
    morganLogger.debug(message)
  },
}

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath:
        NODE_ENV === 'production'
          ? join(__dirname, 'client')
          : join(__dirname, '../..', 'client/build'),
      exclude: ['/api*'],
    }),
    ConfigModule.forRoot(),

    // modules
    ShortUrlModule,
    ClickModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [ShortUrlService, ClickService, AuthService, ...logProviders],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    })

    if (enableDebugLogging) {
      consumer.apply(morgan('dev', {stream: morganLogStream})).forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      })
    }
  }
}
