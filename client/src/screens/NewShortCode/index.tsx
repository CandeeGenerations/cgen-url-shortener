import React, {useContext, useState} from 'react'
import Form from 'antd/es/form'
import Alert from 'antd/es/alert'
import Input from 'antd/es/input'
import Button from 'antd/es/button'
import Text from 'antd/es/typography/Text'
import Link from 'antd/es/typography/Link'
import Paragraph from 'antd/es/typography/Paragraph'

import {ConfigContext} from '../App'
import {createShortUrl} from '../../api'
import Title from '../../components/Title'
import Container from '../../components/Container'
import {ShortUrlInput, ShortUrlModel} from '../../models/models'

const emailRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/

const NewShortCode = () => {
  const configContext = useContext(ConfigContext)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [shortUrl, setShortUrl] = useState<ShortUrlModel | null>(null)

  const routingUrl = configContext?.routingUrl || ''

  const onFinish = async (values: ShortUrlInput) => {
    setLoading(true)

    try {
      const response = await createShortUrl({
        fullUrl: values.fullUrl.trim(),
        shortCode: values.shortCode?.trim(),
      })

      setShortUrl(response)
    } catch (error) {
      setError(error.message)
    }

    setLoading(false)
  }

  return (
    <Container>
      <Title>New Short Code</Title>

      {shortUrl ? (
        <>
          <Alert
            message="Success"
            description="Your new short URL is ready!"
            type="success"
            style={{marginBottom: 30}}
          />

          <div style={{textAlign: 'center'}}>
            <Text strong>Short URL</Text>

            <Paragraph
              copyable={{
                text: `${routingUrl}/${shortUrl.shortCode}`,
              }}
              style={{fontSize: 18}}
            >
              <Text code>{`${routingUrl}/${shortUrl.shortCode}`}</Text>
            </Paragraph>

            <Link onClick={() => setShortUrl(null)}>
              Create Another Short URL
            </Link>
          </div>
        </>
      ) : (
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

          <Form layout="vertical" name="basic" onFinish={onFinish}>
            <Form.Item
              label="Full URL"
              name="fullUrl"
              rules={[
                {required: true, message: 'Please include the full URL'},
                {
                  pattern: emailRegex,
                  message: 'Please enter a valid URL',
                },
              ]}
            >
              <Input type="url" />
            </Form.Item>

            <Form.Item
              label="Short Code"
              name="shortCode"
              rules={[
                {
                  pattern: /[A-Za-z0-9-_]/,
                  message:
                    'The short code can only contain alphanumeric characters, a dash (-), or an underscore (_)',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item style={{textAlign: 'center'}}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Create Short Link
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Container>
  )
}

export default NewShortCode
