import {Module} from '@nestjs/common'

import {ShortUrlService} from './services/shortUrl.service'
import {ClickService} from '../click/services/click.service'
import {ShortUrlController} from './controllers/shortUrl.controller'

@Module({
  controllers: [ShortUrlController],
  providers: [ShortUrlService, ClickService],
})
export class ShortUrlModule {}
