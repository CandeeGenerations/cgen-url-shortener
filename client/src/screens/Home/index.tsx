import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'

import Error from './Error'
import Container from '../../components/Container'

export interface Parameters {
  e?: string
  c?: string
}

const Home = () => {
  const [parameters, setParameters] = useState<Parameters>({e: '', c: ''})
  let history = useHistory()

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

  if (!parameters.e && process.env.NODE_ENV !== 'development') {
    window.location.href = `${process.env.REACT_APP_REDIRECT_URL}`

    return (
      <Container>
        <div>Loading...</div>
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
