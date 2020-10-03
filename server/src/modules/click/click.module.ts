import {Module} from '@nestjs/common'

import {ClickService} from './services/click.service'
import {ClickController} from './controllers/click.controller'

@Module({
  controllers: [ClickController],
  providers: [ClickService],
})
export class ClickModule {}
