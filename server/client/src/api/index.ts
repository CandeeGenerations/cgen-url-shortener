import axios from 'axios'

const getAuthToken = (): string | null => localStorage.getItem('x-cgen-auth')

export const testCall = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/hello`, {
    headers: {'x-cgen-auth': getAuthToken()},
  })
}
