import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'

import Error from './Error'
import Login from '../../components/Login'
import Container from '../../components/Container'

export interface Parameters {
  e?: string
  c?: string
}

export interface HomeProps {
  onLogIn: () => void
}

const Home = (props: HomeProps) => {
  const history = useHistory()
  const [parameters, setParameters] = useState<Parameters>({e: '', c: ''})

  useEffect(() => {
    const search = history.location.search
    const hashes = search.slice(search.indexOf('?') + 1).split('&')
    const params: Parameters = {e: '', c: ''}

    hashes.forEach(hash => {
      const [key, val] = hash.split('=')

      params[key] = val
    })

    setParameters(params)
  }, [history.location.search])

  if (!parameters.e) {
    return (
      <Container>
        <Login onLogIn={props.onLogIn} />
      </Container>
    )
  }

  return (
    <Container>
      <Error parameters={parameters} />
    </Container>
  )
}

export default Home
