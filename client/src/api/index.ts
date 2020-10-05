import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {
  Click,
  ClickModel,
  ErrorModel,
  ShortUrl,
  ShortUrlInput,
  ShortUrlModel,
} from '../models/models'

const getAuthToken = (): string | null => localStorage.getItem('x-cgen-auth')

const get = async <T>({url, ...config}: AxiosRequestConfig) =>
  axios.get<T>(`${process.env.REACT_APP_API_URL}/${url}`, {
    headers: {'x-cgen-auth': getAuthToken()},
    ...config,
  })

const post = async <T>({url, data, ...config}: AxiosRequestConfig) =>
  await axios
    .post<T>(`${process.env.REACT_APP_API_URL}/${url}`, data, {
      headers: {'x-cgen-auth': getAuthToken()},
      ...config,
    })
    .catch(error => {
      if (error.response) {
        return error.response.data as ErrorModel
      } else {
        return {
          error: 'Error',
          message: error.message,
          statusCode: 400,
        } as ErrorModel
      }
    })

const put = async <T>({url, data, ...config}: AxiosRequestConfig) =>
  await axios.put<T>(`${process.env.REACT_APP_API_URL}/${url}`, data, {
    headers: {'x-cgen-auth': getAuthToken()},
    ...config,
  })

export const findAllShortUrls = async (): Promise<ShortUrlModel[]> => {
  const response = await get<ShortUrlModel[]>({url: 'short'})

  return response.data
}

export const findShortUrl = async (
  shortCode: string,
): Promise<ShortUrlModel> => {
  const response = await get<ShortUrlModel>({url: `short/${shortCode}`})

  return response.data
}

export const createShortUrl = async (
  input: ShortUrlInput,
): Promise<ShortUrlModel> => {
  const response = await post<ShortUrlModel>({url: 'short', data: {...input}})
  const error = response as ErrorModel

  if (error && error.statusCode === 400) {
    throw new Error(error.message)
  }

  return (response as AxiosResponse<ShortUrlModel>).data
}

export const updateShortUrl = async (
  id: string,
  input: ShortUrl,
): Promise<ShortUrlModel> => {
  const response = await put<ShortUrlModel>({
    url: `short/${id}`,
    data: {...input},
  })

  return response.data
}

export const findAllClicks = async (): Promise<ClickModel[]> => {
  const response = await get<ClickModel[]>({url: 'click'})

  return response.data
}

export const findAllClicksByShortUrl = async (
  urlId: string,
): Promise<Click[]> => {
  const response = await get<Click[]>({url: `click/${urlId}`})

  return response.data
}

export const createClick = async (input: Click): Promise<ClickModel> => {
  const response = await post<ClickModel>({url: 'click', data: {...input}})
  const error = response as ErrorModel

  if (error && error.statusCode === 400) {
    throw new Error(error.message)
  }

  return (response as AxiosResponse<ClickModel>).data
}
