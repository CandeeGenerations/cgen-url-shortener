import React from 'react'
import Row from 'antd/es/row'
import Col from 'antd/es/col'

export interface ContainerProps {
  span?: number
  children: React.ReactNode
}

const Container = (props: ContainerProps) => {
  const width = props.span || 10
  const offset = (24 - width) / 2
  const colProps = {span: width, offset}

  return (
    <Row>
      <Col {...colProps}>
        <div
          style={{
            padding: 48,
            minHeight: 280,
            margin: '16px 0',
            background: '#fff',
          }}
        >
          {props.children}
        </div>
      </Col>
    </Row>
  )
}

export default Container