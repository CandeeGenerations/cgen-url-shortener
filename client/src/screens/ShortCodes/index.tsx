import React, {useContext, useEffect, useState} from 'react'

import Space from 'antd/es/space'
import {Link} from 'react-router-dom'
import Skeleton from 'antd/es/skeleton'
import Text from 'antd/es/typography/Text'
import Breadcrumb from 'antd/es/breadcrumb'
import Table, {ColumnsType} from 'antd/es/table'

import {ConfigContext} from '../App'
import {formatDate} from '../../helpers'
import Title from '../../components/Title'
import {findAllShortUrls} from '../../api'
import Container from '../../components/Container'
import {ShortUrlModel} from '../../models/models'

const ShortCodes = () => {
  const configContext = useContext(ConfigContext)
  const [loading, setLoading] = useState(true)
  const [allShortUrls, setAllShortUrls] = useState<ShortUrlModel[]>([])

  const columns: ColumnsType<ShortUrlModel> = [
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
      responsive: ['xl'],
      render: (url: string) => (
        <Text code copyable>
          {url}
        </Text>
      ),
    },
    {
      title: 'Clicks',
      dataIndex: 'clicks',
      key: 'clicks',
      align: 'center',
      render: (clicks?: number) => clicks || 0,
    },
    {
      title: 'Added Date',
      dataIndex: 'addedTs',
      key: 'addedTs',
      responsive: ['xl'],
      render: formatDate,
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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Container span={20} background={false}>
        <Breadcrumb style={{margin: '16px 0'}}>
          <Breadcrumb.Item>
            <Link to="/new">Home</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>Short URLs</Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      <Container span={20}>
        <Title>Short URLs</Title>

        {loading ? (
          <Skeleton active />
        ) : (
          <Table dataSource={allShortUrls} columns={columns} />
        )}
      </Container>
    </>
  )
}

export default ShortCodes
