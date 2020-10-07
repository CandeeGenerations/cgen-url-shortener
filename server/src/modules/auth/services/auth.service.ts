import {GraphQLClient} from 'graphql-request'
import {Injectable, UnauthorizedException} from '@nestjs/common'

import {User} from 'src/models/graphql.schema'
import {getGQLClient} from 'src/api/graphqlRequest'
import {
  CreateUserModel,
  FindAuthorizedUserModel,
  FindUserByGoogleIdModel,
  UserModel,
} from 'src/models/models'
import {
  CREATE_USER,
  FIND_AUTHORIZED_USER,
  FIND_USER_BY_GOOGLE_ID,
} from 'src/models/gqlRequests'

@Injectable()
export class AuthService {
  private gqlClient: GraphQLClient

  constructor() {
    this.gqlClient = getGQLClient()
  }

  async findOrCreateUser(user: User): Promise<UserModel> {
    const response = await this.gqlClient.request<FindUserByGoogleIdModel>(
      FIND_USER_BY_GOOGLE_ID,
      {googleId: user.googleId},
    )

    if (!response.findUserByGoogleId) {
      await this.gqlClient.request<CreateUserModel>(CREATE_USER, {
        input: {...user, authorized: false},
      })

      throw new UnauthorizedException('You are not authorized to log in.')
    }

    if (!response.findUserByGoogleId.authorized) {
      throw new UnauthorizedException('You are not authorized to log in.')
    }

    return response.findUserByGoogleId
  }

  async findAuthorizedUser(googleId: string): Promise<UserModel> {
    const response = await this.gqlClient.request<FindAuthorizedUserModel>(
      FIND_AUTHORIZED_USER,
      {googleId},
    )

    if (!response.findAuthorizedUser) {
      throw new UnauthorizedException('You are not authorized to log in.')
    }

    return response.findAuthorizedUser
  }
}
