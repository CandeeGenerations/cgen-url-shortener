import * as dotenv from 'dotenv'
import {NestFactory} from '@nestjs/core'
import {NestExpressApplication} from '@nestjs/platform-express'

import {AppModule} from './modules/app/app.module'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  })
  app.setGlobalPrefix('api')

  await app.listen(3001)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
