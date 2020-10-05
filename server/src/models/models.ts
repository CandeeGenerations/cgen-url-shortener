import {Click, ShortUrl} from './graphql.schema'

export interface ShortUrlInput {
  fullUrl: string
  shortCode?: string
}

export interface ShortUrlModel extends ShortUrl {
  _id: string
  _ts: string
}

export interface ClickModel extends Click {
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
