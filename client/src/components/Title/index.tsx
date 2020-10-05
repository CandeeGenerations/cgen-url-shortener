import React from 'react'
import ATitle from 'antd/es/typography/Title'

export interface TitleProps {
  children: React.ReactNode | string
}

const Title = (props: TitleProps) => {
  return (
    <>
      <ATitle>{props.children}</ATitle>

      <hr style={{marginBottom: 30}} />
    </>
  )
}

export default Title
