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

export const FIND_SHORT_URL_BY_ID = gql`
  query FindShortUrlById($id: ID!) {
    findShortUrlByID(id: $id) {
      _id
      _ts
      shortCode
      fullUrl
      addedTs
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
        language
        userAgent
        ipAddress
        country
        region
        city
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
        language
        userAgent
        ipAddress
        country
        region
        city
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
      language
      userAgent
      ipAddress
      country
      region
      city
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(data: $input) {
      _id
      _ts
      email
      firstName
      lastName
      googleId
      authorized
    }
  }
`

export const FIND_USER_BY_GOOGLE_ID = gql`
  query FindUserByGoogleId($googleId: String!) {
    findUserByGoogleId(googleId: $googleId) {
      _id
      _ts
      email
      firstName
      lastName
      googleId
      authorized
    }
  }
`

export const FIND_AUTHORIZED_USER = gql`
  query FindAuthorizedUser($googleId: String!) {
    findAuthorizedUser(googleId: $googleId, authorized: true) {
      _id
      _ts
      email
      firstName
      lastName
      googleId
      authorized
    }
  }
`
