import {
  LoginResponse,
  RefreshTokenResponse
} from './HttpModel'
import { handleResponse } from './Util';
import { createRefresh } from 'react-auth-kit'

export function Login(password: string, callback: (data: LoginResponse) => void) {
  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({ 'password': password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(handleResponse)
    .then((data) => callback(data))
    .catch((err) => {
      console.log(err.message);
    });
}

export const RefreshApi = createRefresh({
  interval: 1,
  refreshApiCallback: async ({ refreshToken }) => {
    try {
      const data: RefreshTokenResponse = await fetch('/refresh', {
        method: 'POST',
        body: JSON.stringify({ 'refresh_token': refreshToken }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(handleResponse)

      return {
        isSuccess: true,
        newAuthToken: data.auth_token,
        newAuthTokenExpireIn: data.auth_token_ttl
      }
    }
    catch (error) {
      console.error(error)
      return {
        isSuccess: false,
        newAuthToken: ""
      }
    }
  }
})
