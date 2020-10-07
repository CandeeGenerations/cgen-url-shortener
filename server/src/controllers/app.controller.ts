import {ConfigService} from '@nestjs/config'
import {Controller, Get} from '@nestjs/common'

import {ConfigModel} from 'src/models/models'

@Controller('api/config')
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getConfig(): ConfigModel {
    const config: ConfigModel = {
      gClientId: this.configService.get<string>('G_CLIENT_ID'),
      routingUrl: this.configService.get<string>('ROUTING_URL'),
    }

    return config
  }
}
