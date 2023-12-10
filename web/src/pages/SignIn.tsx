import { ChangeEvent, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Form from '../components/Form'
import { Login } from '../http/AuthApi';
import { useSignIn } from 'react-auth-kit'


const SignIn = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const signIn = useSignIn()
  const [password, setPassword] = useState("")

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  let redirectTo = '/'
  const hash = location.state['hash']
  if (hash) {
    redirectTo = hash.split('#')[1]
  }

  const onSubmit = () => {
    Login(password, (data) => {
      if (signIn(
        {
          token: data.auth_token,
          expiresIn: 10,
          authState: {},
          tokenType: "Bearer",
          refreshToken: data.refresh_token,
          refreshTokenExpireIn: 1440
        }
      )) {
        navigate(redirectTo)
      }
    })
  }

  return (
    <Form btnName="登陆" btnStyleClass='btn-primary' readyToSubmit={true} onSubmit={onSubmit}>
      <div className="row g-3 align-items-center justify-content-center">
        <div className="col-9">
          <form>
            <h1 className="h3 mb-3 fw-normal">输入密码</h1>
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="密码"
              onChange={onPasswordChange} />
          </form>
        </div>
      </div>
    </Form>
  )
}

export default SignIn