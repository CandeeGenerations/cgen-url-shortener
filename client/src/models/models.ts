export interface ConfigModel {
  routingUrl: string
  gClientId: string
}

export interface ShortUrlInput {
  fullUrl: string
  shortCode?: string
}

export interface ShortUrl extends ShortUrlInput {
  addedTs: string
}

export interface Click {
  urlId: string
  clickedTs: string
  ipAddress?: string
  language?: string
  userAgent?: string
  country?: string
  region?: string
  city?: string
}

export interface ShortUrlModel extends ShortUrl {
  _id: string
  _ts: string
}

export interface ClickModel extends Click {
  _id: string
  _ts: string
}

export interface ErrorModel {
  error: string
  message: string
  statusCode: number
}

export interface User {
  googleId: string
  email: string
  firstName: string
  lastName: string
}
