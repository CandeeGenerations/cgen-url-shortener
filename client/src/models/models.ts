export interface ShortUrl {
  fullUrl: string
  shortCode?: string
  addedTs: string
}

export interface Click {
  urlId: string
  clickedTs: string
  ipAddress?: string
  location?: string
  browser?: string
}

export interface ShortUrlModel extends ShortUrl {
  _id: string
  _ts: string
}

export interface ClickModel extends Click {
  _id: string
  _ts: string
}
