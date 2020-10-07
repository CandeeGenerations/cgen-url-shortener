import React, {useEffect, useState} from 'react'
import Alert from 'antd/es/alert'
import Button from 'antd/es/button'
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login'

import {findOrCreateUser} from '../../api'

const Login = () => {
  const authToken = 'x-cgen-auth'

  const [error, setError] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setLoggedIn(localStorage.getItem(authToken) !== null)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const responseGoogle = async (
    r: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    const response = r as GoogleLoginResponse

    try {
      const user = await findOrCreateUser(response)

      localStorage.setItem(authToken, btoa(JSON.stringify(user)))
      setLoggedIn(true)
    } catch (error) {
      setError(error.message)
    }
  }

  const logOut = () => {
    localStorage.removeItem(authToken)
    setLoggedIn(false)
  }

  return (
    <>
      {error && (
        <Alert
          message="Error"
          description={`${error}`}
          type="error"
          closable
          onClose={() => setError('')}
          style={{marginBottom: 30}}
        />
      )}

      <div style={{textAlign: 'center'}}>
        {!loggedIn ? (
          <GoogleLogin
            clientId={process.env.REACT_APP_G_CLIENT_ID as string}
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            onRequest={() => setError('')}
          />
        ) : (
          <Button onClick={logOut}>Log out</Button>
        )}
      </div>
    </>
  )
}

export default Login
