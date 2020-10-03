import {Injectable} from '@nestjs/common'
import {GraphQLClient} from 'graphql-request'

import {Click} from 'src/models/graphql.schema'
import {getGQLClient} from 'src/api/graphqlRequest'
import {
  CREATE_CLICK,
  FIND_ALL_CLICKS,
  FIND_ALL_CLICKS_BY_SHORT_URL,
} from 'src/models/gqlRequests'
import {
  ClickModel,
  CreateClickModel,
  FindAllClicksByShortUrlModel,
  FindAllClicksModel,
} from 'src/models/models'

@Injectable()
export class ClickService {
  private gqlClient: GraphQLClient

  constructor() {
    this.gqlClient = getGQLClient()
  }

  async findAllClicks(): Promise<[ClickModel]> {
    const response = await this.gqlClient.request<FindAllClicksModel>(
      FIND_ALL_CLICKS,
    )

    return response.findAllClicks.data
  }

  async findAllClicksByShortUrl(urlId: string): Promise<[ClickModel]> {
    const response = await this.gqlClient.request<FindAllClicksByShortUrlModel>(
      FIND_ALL_CLICKS_BY_SHORT_URL,
      {urlId},
    )

    return response.findAllClicksByShortUrl.data
  }

  async createClick(input: Click): Promise<ClickModel> {
    const response = await this.gqlClient.request<CreateClickModel>(
      CREATE_CLICK,
      {input},
    )

    return response.createClick
  }
}
