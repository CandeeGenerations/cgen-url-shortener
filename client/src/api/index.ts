import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {GoogleLoginResponse} from 'react-google-login'
import {
  Click,
  ClickModel,
  ErrorModel,
  ShortUrl,
  ShortUrlInput,
  ShortUrlModel,
  User,
  ConfigModel,
} from '../models/models'

const apiUrl = process.env.REACT_APP_API_URL || '/api'
const getAuthToken = (): string | null => localStorage.getItem('x-cgen-auth')

const handleCatch = (error: any) => {
  if (error.response) {
    return error.response.data as ErrorModel
  } else {
    return {
      error: 'Error',
      message: error.message,
      statusCode: 400,
    } as ErrorModel
  }
}

const get = async <T>({url, ...config}: AxiosRequestConfig) =>
  axios
    .get<T>(`${apiUrl}/${url}`, {
      headers: {'x-cgen-auth': getAuthToken()},
      ...config,
    })
    .catch(handleCatch)

const post = async <T>({url, data, ...config}: AxiosRequestConfig) =>
  await axios
    .post<T>(`${apiUrl}/${url}`, data, {
      headers: {'x-cgen-auth': getAuthToken()},
      ...config,
    })
    .catch(handleCatch)

const put = async <T>({url, data, ...config}: AxiosRequestConfig) =>
  await axios
    .put<T>(`${apiUrl}/${url}`, data, {
      headers: {'x-cgen-auth': getAuthToken()},
      ...config,
    })
    .catch(handleCatch)

const handleErrors = <T>(response: ErrorModel | AxiosResponse<T>) => {
  const error = response as ErrorModel

  if (error && [400, 401].includes(error.statusCode)) {
    throw new Error(error.message)
  }

  return (response as AxiosResponse<T>).data
}

export const getConfig = async (): Promise<ConfigModel> => {
  const response = await get<ConfigModel>({url: 'config'})

  return handleErrors(response)
}

export const findAllShortUrls = async (): Promise<ShortUrlModel[]> => {
  const response = await get<ShortUrlModel[]>({url: 'short'})

  return handleErrors(response)
}

export const findShortUrl = async (
  shortCode: string,
): Promise<ShortUrlModel> => {
  const response = await get<ShortUrlModel>({url: `short/${shortCode}`})

  return handleErrors(response)
}

export const findShortUrlById = async (id: string): Promise<ShortUrlModel> => {
  const response = await get<ShortUrlModel>({url: `short/id/${id}`})

  return handleErrors(response)
}

export const createShortUrl = async (
  input: ShortUrlInput,
): Promise<ShortUrlModel> => {
  const response = await post<ShortUrlModel>({url: 'short', data: {...input}})

  return handleErrors(response)
}

export const updateShortUrl = async (
  id: string,
  input: ShortUrl,
): Promise<ShortUrlModel> => {
  const response = await put<ShortUrlModel>({
    url: `short/${id}`,
    data: {...input},
  })

  return handleErrors(response)
}

export const findAllClicks = async (): Promise<ClickModel[]> => {
  const response = await get<ClickModel[]>({url: 'click'})

  return handleErrors(response)
}

export const findAllClicksByShortUrl = async (
  urlId: string,
): Promise<ClickModel[]> => {
  const response = await get<ClickModel[]>({url: `click/${urlId}`})

  return handleErrors(response)
}

export const createClick = async (input: Click): Promise<ClickModel> => {
  const response = await post<ClickModel>({url: 'click', data: {...input}})

  return handleErrors(response)
}

export const findOrCreateUser = async ({
  profileObj,
}: GoogleLoginResponse): Promise<User> => {
  const response = await post<User>({
    url: 'auth',
    data: {
      user: {
        email: profileObj.email,
        firstName: profileObj.givenName,
        lastName: profileObj.familyName,
        googleId: profileObj.googleId,
      },
    },
  })

  return handleErrors(response)
}
