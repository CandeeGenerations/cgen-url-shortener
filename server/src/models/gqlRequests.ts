import {gql} from 'graphql-request'

export const FIND_ALL_SHORT_URLS = gql`
  query FindAllShortUrls {
    findAllShortUrls {
      data {
        _id
        _ts
        shortCode
        fullUrl
        addedTs
      }
    }
  }
`

export const FIND_SHORT_URL = gql`
  query FindShortUrl($shortCode: String!) {
    findShortUrl(shortCode: $shortCode) {
      _id
      _ts
      shortCode
      fullUrl
      addedTs
    }
  }
`

export const CREATE_SHORT_URL = gql`
  mutation CreateShortUrl($input: ShortUrlInput!) {
    createShortUrl(data: $input) {
      _id
      _ts
      shortCode
      fullUrl
      addedTs
    }
  }
`

export const UPDATE_SHORT_URL = gql`
  mutation UpdateShortUrl($id: ID!, $input: ShortUrlInput!) {
    updateShortUrl(id: $id, data: $input) {
      _id
      _ts
      shortCode
      fullUrl
      addedTs
    }
  }
`

export const FIND_ALL_CLICKS = gql`
  query FindAllClicks {
    findAllClicks {
      data {
        _id
        _ts
        urlId
        clickedTs
        location
        browser
        ipAddress
      }
    }
  }
`

export const FIND_ALL_CLICKS_BY_SHORT_URL = gql`
  query FindAllClicksByShortUrl($urlId: ID!) {
    findAllClicksByShortUrl(urlId: $urlId) {
      data {
        _id
        _ts
        urlId
        clickedTs
        location
        browser
        ipAddress
      }
    }
  }
`

export const CREATE_CLICK = gql`
  mutation CreateClick($input: ClickInput!) {
    createClick(data: $input) {
      _id
      _ts
      urlId
      clickedTs
      location
      browser
      ipAddress
    }
  }
`
