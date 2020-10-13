import {Click, ShortUrl, User} from './graphql.schema'

export interface ConfigModel {
  routingUrl: string
  gClientId: string
}

export interface ShortUrlInput {
  fullUrl: string
  shortCode?: string
}

export interface ShortUrlModel extends ShortUrl {
  _id: string
  _ts: string
  clicks: number
}

export interface ClickModel extends Click {
  _id: string
  _ts: string
}

export interface UserModel extends User {
  _id: string
  _ts: string
}

export interface FindAllShortUrlsModel {
  findAllShortUrls: {
    data: [ShortUrlModel]
  }
}

export interface FindShortUrlModel {
  findShortUrl: ShortUrlModel
}

export interface FindShortUrlByIdModel {
  findShortUrlByID: ShortUrlModel
}

export interface CreateShortUrlModel {
  createShortUrl: ShortUrlModel
}

export interface UpdateShortUrlModel {
  updateShortUrl: ShortUrlModel
}

export interface FindAllClicksModel {
  findAllClicks: {
    data: [ClickModel]
  }
}

export interface FindAllClicksByShortUrlModel {
  findAllClicksByShortUrl: {
    data: [ClickModel]
  }
}

export interface CreateClickModel {
  createClick: ClickModel
}

export interface CreateUserModel {
  createUser: UserModel
}

export interface FindUserByGoogleIdModel {
  findUserByGoogleId: UserModel
}

export interface FindAuthorizedUserModel {
  findAuthorizedUser: UserModel
}
