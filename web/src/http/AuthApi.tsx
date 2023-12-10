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
  interval: 10,
  refreshApiCallback: async ({ refreshToken }) => {
    try {
      const data: RefreshTokenResponse = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ 'refresh_token': refreshToken }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(handleResponse)

      return {
        isSuccess: true,
        newAuthToken: data.auth_token,
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60
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
