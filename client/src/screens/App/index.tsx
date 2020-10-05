import React from 'react'
import Menu from 'antd/es/menu'
import Layout from 'antd/es/layout'
import {Switch, Route, Link, BrowserRouter} from 'react-router-dom'

import './app.css'

import Home from '../Home'
import ShortCodes from '../ShortCodes'
import NewShortCode from '../NewShortCode'

const {Header, Content, Footer} = Layout

const App = () => {
  // findAllShortUrls()
  // findShortUrl('tt28sep20')
  // findAllClicks()
  // findAllClicksByShortUrl('278027294192173576')
  // createClick({
  //   clickedTs: '1601406036',
  //   urlId: '278027294192173576',
  //   browser: 'Firefox',
  //   ipAddress: '192.168.1.2',
  //   location: 'Woodbridge, VA',
  // })
  // createShortUrl({
  //   addedTs: '1601406036',
  //   fullUrl: 'https://kjv.cgen.cc/todays-thoughts-29-september-2020',
  //   // shortCode: 'tt29sep20',
  // })
  // updateShortUrl('278027294192173576', {
  //   addedTs: '1601406036',
  //   fullUrl: 'https://kjv.cgen.cc/todays-thoughts-29-september-2020',
  //   shortCode: '123',
  // })

  return (
    <BrowserRouter>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>

            <Menu.Item key="2">
              <Link to="/new">New Short Code</Link>
            </Menu.Item>

            <Menu.Item key="3">
              <Link to="/codes">Short Codes</Link>
            </Menu.Item>
          </Menu>
        </Header>

        <Content style={{padding: '0 50px'}}>
          <Switch>
            <Route path="/new">
              <NewShortCode />
            </Route>

            <Route path="/codes">
              <ShortCodes />
            </Route>

            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Content>

        <Footer style={{textAlign: 'center'}}>
          Candee Generations &copy; {new Date().getFullYear()}
        </Footer>
      </Layout>
    </BrowserRouter>
  )
}

export default App
