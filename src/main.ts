import {join} from 'path'
import * as hbs from 'hbs'
import {NestFactory} from '@nestjs/core'
import {NestExpressApplication} from '@nestjs/platform-express'

import {AppModule} from './modules/app/app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useStaticAssets(join(__dirname, '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', 'views'))
  app.setViewEngine('hbs')
  app.set('view options', {layout: 'partials/layout'})

  hbs.registerPartials(join(__dirname, '/views/partials'))

  await app.listen(3000)
}
bootstrap()
