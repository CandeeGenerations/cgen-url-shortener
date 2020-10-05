import React, {useEffect, useState} from 'react'

import {Parameters} from '.'
import Title from '../../components/Title'

export interface ErrorProps {
  parameters: Parameters
}

const Error = (props: ErrorProps) => {
  const [errorType, setErrorType] = useState('Unknown')
  const [code, setCode] = useState('')

  useEffect(() => {
    if (props.parameters.e) {
      setErrorType(props.parameters.e === 'notFound' ? 'Not Found' : 'Unknown')
    }
  }, [props.parameters.e])

  useEffect(() => {
    setCode(props.parameters.c || '')
  }, [props.parameters.c])

  return (
    <div>
      <Title>Error: {errorType}</Title>

      {errorType === 'Not Found' ? (
        <div>
          <p>
            The short code you are trying to use doesn't work. Make sure the URL
            you are using is correct.
          </p>
          <p>
            <strong>Short Code:</strong> {code}
          </p>
        </div>
      ) : (
        <p>There seems to be an error. Please try again.</p>
      )}
    </div>
  )
}

export default Error
