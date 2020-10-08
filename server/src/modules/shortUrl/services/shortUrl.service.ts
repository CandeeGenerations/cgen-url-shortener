import * as dayjs from 'dayjs'
import {GraphQLClient} from 'graphql-request'
import {BadRequestException, Injectable} from '@nestjs/common'

import {makeId} from 'src/helpers'
import {ShortUrl} from 'src/models/graphql.schema'
import {getGQLClient} from 'src/api/graphqlRequest'
import {
  CREATE_SHORT_URL,
  FIND_ALL_SHORT_URLS,
  FIND_SHORT_URL,
  UPDATE_SHORT_URL,
  FIND_SHORT_URL_BY_ID,
} from 'src/models/gqlRequests'
import {
  CreateShortUrlModel,
  FindAllShortUrlsModel,
  FindShortUrlByIdModel,
  FindShortUrlModel,
  ShortUrlInput,
  ShortUrlModel,
  UpdateShortUrlModel,
} from 'src/models/models'

@Injectable()
export class ShortUrlService {
  private gqlClient: GraphQLClient

  constructor() {
    this.gqlClient = getGQLClient()
  }

  async findAllShortUrls(): Promise<[ShortUrlModel]> {
    const response = await this.gqlClient.request<FindAllShortUrlsModel>(
      FIND_ALL_SHORT_URLS,
    )

    return response.findAllShortUrls.data
  }

  async findShortUrl(shortCode: string): Promise<ShortUrlModel> {
    const response = await this.gqlClient.request<FindShortUrlModel>(
      FIND_SHORT_URL,
      {shortCode},
    )

    return response.findShortUrl
  }

  async findShortUrlById(id: string): Promise<ShortUrlModel> {
    const response = await this.gqlClient.request<FindShortUrlByIdModel>(
      FIND_SHORT_URL_BY_ID,
      {id},
    )

    return response.findShortUrlByID
  }

  async createShortUrl(input: ShortUrlInput): Promise<ShortUrlModel> {
    if (input.shortCode) {
      const valid = await this.validateShortCode(input.shortCode)

      if (!valid) {
        throw new BadRequestException('This Short URL already exists.')
      }
    } else {
      const generateNewShortCode = async () => {
        const newShortCode = makeId()
        const valid = await this.validateShortCode(newShortCode)

        if (valid) {
          input.shortCode = newShortCode
        } else {
          await generateNewShortCode()
        }
      }

      await generateNewShortCode()
    }

    const response = await this.gqlClient.request<CreateShortUrlModel>(
      CREATE_SHORT_URL,
      {
        input: {
          ...input,
          addedTs: dayjs()
            .valueOf()
            .toString(),
        },
      },
    )

    return response.createShortUrl
  }

  async updateShortUrl(id: string, input: ShortUrl): Promise<ShortUrlModel> {
    if (input.shortCode) {
      const valid = await this.validateShortCode(input.shortCode, id)

      if (!valid) {
        throw new BadRequestException('This Short URL already exists.')
      }
    } else {
      const generateNewShortCode = async () => {
        const newShortCode = makeId()
        const valid = await this.validateShortCode(newShortCode)

        if (valid) {
          input.shortCode = newShortCode
        } else {
          await generateNewShortCode()
        }
      }

      await generateNewShortCode()
    }

    const response = await this.gqlClient.request<UpdateShortUrlModel>(
      UPDATE_SHORT_URL,
      {id, input},
    )

    return response.updateShortUrl
  }

  private async validateShortCode(
    shortCode: string,
    urlId?: string,
  ): Promise<boolean> {
    const existingShortUrl = await this.findShortUrl(shortCode)

    return existingShortUrl && urlId
      ? existingShortUrl._id === urlId
      : !existingShortUrl
  }
}
