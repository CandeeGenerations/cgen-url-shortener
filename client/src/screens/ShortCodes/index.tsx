import React, {useContext, useEffect, useState} from 'react'
import dayjs from 'dayjs'
import Table from 'antd/es/table'
import Space from 'antd/es/space'
import {Link} from 'react-router-dom'
import Skeleton from 'antd/es/skeleton'
import Text from 'antd/es/typography/Text'

import {ConfigContext} from '../App'
import Title from '../../components/Title'
import {findAllShortUrls} from '../../api'
import Container from '../../components/Container'
import {ShortUrlModel} from '../../models/models'

const ShortCodes = () => {
  const configContext = useContext(ConfigContext)
  const [loading, setLoading] = useState(true)
  const [allShortUrls, setAllShortUrls] = useState<ShortUrlModel[]>([])

  const columns = [
    {
      title: 'Short Code',
      dataIndex: 'shortCode',
      key: 'shortCode',
      render: (code: string) => (
        <Text
          code
          copyable={{
            text: `${configContext?.routingUrl || ''}/${code}`,
          }}
        >
          {code}
        </Text>
      ),
    },
    {
      title: 'Full URL',
      dataIndex: 'fullUrl',
      key: 'fullUrl',
      render: (url: string) => (
        <Text code copyable>
          {url}
        </Text>
      ),
    },
    {
      title: 'Added Date',
      dataIndex: 'addedTs',
      key: 'addedTs',
      render: (ts: string) => {
        const date = dayjs(parseInt(ts))

        return `${date.format('D MMM YYYY')} at ${date.format('HH:mm')}`
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: ShortUrlModel) => (
        <Space size="middle">
          <Link to={`/codes/${record._id}`}>View Details</Link>
        </Space>
      ),
    },
  ]

  const getShortUrls = async () => {
    const response = await findAllShortUrls()

    setAllShortUrls(response)
    setLoading(false)
  }

  useEffect(() => {
    getShortUrls()
  }, [])

  return (
    <Container span={20}>
      <Title>Short Codes</Title>

      {loading ? (
        <Skeleton active />
      ) : (
        <Table dataSource={allShortUrls} columns={columns} />
      )}
    </Container>
  )
}

export default ShortCodes
