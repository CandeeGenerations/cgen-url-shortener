import {Body, Controller, Get, Param, Post} from '@nestjs/common'

import {ClickModel} from 'src/models/models'
import {Click} from 'src/models/graphql.schema'
import {ClickService} from '../services/click.service'

@Controller('api/click')
export class ClickController {
  constructor(private readonly clickService: ClickService) {}

  @Get()
  findAllClicks(): Promise<[ClickModel]> {
    return this.clickService.findAllClicks()
  }

  @Get(':urlId')
  findAllClicksByShortUrl(
    @Param('urlId') urlId: string,
  ): Promise<[ClickModel]> {
    return this.clickService.findAllClicksByShortUrl(urlId)
  }

  @Post()
  createClick(@Body() input: Click): Promise<ClickModel> {
    return this.clickService.createClick(input)
  }
}
