import * as dayjs from 'dayjs'
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common'

import {ShortUrlModel} from 'src/models/models'
import {ShortUrl} from 'src/models/graphql.schema'
import {ShortUrlService} from '../services/shortUrl.service'
import {ClickService} from 'src/modules/click/services/click.service'

@Controller('api/short')
export class ShortUrlController {
  constructor(
    private readonly shortUrlService: ShortUrlService,
    private readonly clickService: ClickService,
  ) {}

  @Get()
  findAllShortUrls(): Promise<[ShortUrlModel]> {
    return this.shortUrlService.findAllShortUrls()
  }

  @Get(':shortCode')
  findShortUrl(@Param('shortCode') shortCode: string): Promise<ShortUrlModel> {
    return this.shortUrlService.findShortUrl(shortCode)
  }

  @Post(':shortCode')
  async getRedirectUrl(
    @Param('shortCode') shortCode: string,
  ): Promise<ShortUrlModel> {
    const shortUrl = await this.shortUrlService.findShortUrl(shortCode)

    if (!shortUrl) {
      throw new BadRequestException('This Short URL does not exist.')
    }

    await this.clickService.createClick({
      clickedTs: dayjs()
        .unix()
        .toString(),
      urlId: shortUrl._id,
    })

    return shortUrl
  }

  @Post()
  createShortUrl(@Body() input: ShortUrl): Promise<ShortUrlModel> {
    return this.shortUrlService.createShortUrl(input)
  }

  @Put(':id')
  updateShortUrl(
    @Param('id') id: string,
    @Body() input: ShortUrl,
  ): Promise<ShortUrlModel> {
    return this.shortUrlService.updateShortUrl(id, input)
  }
}