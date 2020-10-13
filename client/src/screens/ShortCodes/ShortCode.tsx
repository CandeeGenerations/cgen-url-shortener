import React, {useContext, useEffect, useState} from 'react'
import Row from 'antd/es/row'
import Col from 'antd/es/col'
import Table from 'antd/es/table'
import Tooltip from 'antd/es/tooltip'
import Skeleton from 'antd/es/skeleton'
import Text from 'antd/es/typography/Text'
import Breadcrumb from 'antd/es/breadcrumb'
import {useParams, Link} from 'react-router-dom'

import {ConfigContext} from '../App'
import {formatDate} from '../../helpers'
import Title from '../../components/Title'
import Container from '../../components/Container'
import {ClickModel, ShortUrlModel} from '../../models/models'
import {findAllClicksByShortUrl, findShortUrlById} from '../../api'

const columns = [
  {
    title: 'Date Clicked',
    dataIndex: 'clickedTs',
    key: 'clickedTs',
    render: formatDate,
  },
  {
    title: 'IP Address',
    dataIndex: 'ipAddress',
    key: 'ipAddress',
  },
  {
    title: 'Language',
    dataIndex: 'language',
    key: 'language',
  },
  {
    title: 'Browser',
    key: 'browser',
    dataIndex: 'userAgent',
    ellipsis: {
      showTitle: false,
    },
    render: (userAgent: string) => (
      <Tooltip placement="topLeft" title={userAgent}>
        {userAgent}
      </Tooltip>
    ),
  },
  {
    title: 'Location',
    key: 'location',
    render: (text: string, data: ClickModel) =>
      `${data.city || 'Unknown'}, ${data.region || 'Unknown'}, ${data.country ||
        'Unknown'}`,
  },
]

const ShortCode = () => {
  const {id} = useParams<{id: string}>()
  const configContext = useContext(ConfigContext)

  const [clicks, setClicks] = useState<ClickModel[]>([])
  const [loadingClicks, setLoadingClicks] = useState(true)
  const [loadingShortUrl, setLoadingShortUrl] = useState(true)
  const [shortUrl, setShortUrl] = useState<ShortUrlModel | null>(null)

  const getShortUrl = async () => {
    const response = await findShortUrlById(id)

    setShortUrl(response)
    setLoadingShortUrl(false)
  }

  const getClicks = async () => {
    const response = await findAllClicksByShortUrl(id)

    setClicks(response)
    setLoadingClicks(false)
  }

  useEffect(() => {
    getShortUrl()
    getClicks()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Container span={20} background={false}>
        <Breadcrumb style={{margin: '16px 0'}}>
          <Breadcrumb.Item>
            <Link to="/new">Home</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <Link to="/codes">Short URLs</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            {loadingShortUrl ? '...' : shortUrl?.shortCode}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      <Container span={20}>
        <Title>Short URL</Title>

        {loadingShortUrl || !shortUrl ? (
          <Skeleton active />
        ) : (
          <Row gutter={[16, {md: 16, sm: 24, xs: 24}]}>
            <Col md={4} sm={24} xs={24}>
              <strong>Short Code:</strong>
              <br />
              <Text
                code
                copyable={{
                  text: `${configContext?.routingUrl || ''}/${
                    shortUrl.shortCode
                  }`,
                }}
              >
                {shortUrl.shortCode}
              </Text>
            </Col>

            <Col md={12} sm={24} xs={24}>
              <strong>Full URL:</strong>
              <br />
              <Text code copyable>
                {shortUrl.fullUrl}
              </Text>
            </Col>

            <Col md={8} sm={24} xs={24}>
              <strong>Date Added:</strong>
              <br />
              {formatDate(shortUrl.addedTs)}
            </Col>
          </Row>
        )}
      </Container>

      <Container span={20}>
        <Title>Clicks</Title>

        {loadingClicks ? (
          <Skeleton active />
        ) : (
          <Table dataSource={clicks} columns={columns} />
        )}
      </Container>
    </>
  )
}

export default ShortCode
