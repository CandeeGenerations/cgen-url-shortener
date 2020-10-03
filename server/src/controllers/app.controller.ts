import * as dayjs from 'dayjs'
import {ConfigService} from '@nestjs/config'
import {Controller, Get, Inject, Param, Redirect} from '@nestjs/common'

import {ILogger} from 'src/logging'
import {ClickService} from 'src/modules/click/services/click.service'
import {ShortUrlService} from 'src/modules/shortUrl/services/shortUrl.service'

@Controller()
export class AppController {
  constructor(
    private readonly clickService: ClickService,
    private readonly configService: ConfigService,
    private readonly shortUrlService: ShortUrlService,
  ) {}

  @Inject('ILogger')
  logger: ILogger

  @Get(':shortCode')
  @Redirect(process.env.BASE_URL, 302)
  async getRedirectUrl(
    @Param('shortCode') shortCode: string,
  ): Promise<{url: string}> {
    const baseUrl = this.configService.get<string>('BASE_URL')
    const ignored = ['favicon.ico', 'manifest.json', 'new', 'codes']

    if (ignored.includes(shortCode)) {
      return null
    }

    const shortUrl = await this.shortUrlService.findShortUrl(shortCode)

    if (!shortUrl) {
      this.logger.error(`Short code not found (${shortCode})`)

      return {url: `${baseUrl}?e=notFound&c=${shortCode}`}
    }

    await this.clickService.createClick({
      clickedTs: dayjs()
        .unix()
        .toString(),
      urlId: shortUrl._id,
    })

    const url = `${shortUrl.fullUrl}?ref=cgen.cc`

    this.logger.info(
      `Found short code (${shortCode}) - Redirecting to : ${url}`,
    )

    return {url}
  }
}
