import axios from 'axios'
import { API_BASE_URL } from '@/constants'

export const Api = () => {
  const sessionKey = window.localStorage.getItem('session_key')
  return axios.create({
    baseURL: API_BASE_URL,
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...(sessionKey ? { 'session-key': sessionKey } : {})
    }
  })
}
