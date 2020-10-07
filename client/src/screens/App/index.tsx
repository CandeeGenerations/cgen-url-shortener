import React, {useEffect, useState} from 'react'
import Menu from 'antd/es/menu'
import Layout from 'antd/es/layout'
import ALink from 'antd/es/typography/Link'
import {Switch, Route, Link, BrowserRouter, Redirect} from 'react-router-dom'

import './app.css'

import Home from '../Home'
import ShortCodes from '../ShortCodes'
import NewShortCode from '../NewShortCode'
import {authTokenKey} from '../../helpers'

const {Header, Content, Footer} = Layout

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setLoggedIn(localStorage.getItem(authTokenKey) !== null)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onLogIn = () => setLoggedIn(true)

  const onLogOut = () => {
    localStorage.removeItem(authTokenKey)
    setLoggedIn(false)
  }

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
      <Layout style={{minWidth: 470}}>
        {loggedIn && (
          <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/new">New Short Code</Link>
              </Menu.Item>

              <Menu.Item key="2">
                <Link to="/codes">Short Codes</Link>
              </Menu.Item>

              <Menu.Item key="3" style={{float: 'right'}}>
                <ALink onClick={onLogOut}>Log Out</ALink>
              </Menu.Item>
            </Menu>
          </Header>
        )}

        <Content style={{padding: loggedIn ? '0 50px' : '50px 50px 0'}}>
          <Switch>
            <Route
              path="/codes"
              render={({location}) =>
                loggedIn ? (
                  <ShortCodes />
                ) : (
                  <Redirect
                    to={{
                      pathname: '/',
                      state: {from: location},
                    }}
                  />
                )
              }
            />

            <Route
              path="/new"
              render={({location}) =>
                loggedIn ? (
                  <NewShortCode />
                ) : (
                  <Redirect
                    to={{
                      pathname: '/',
                      state: {from: location},
                    }}
                  />
                )
              }
            />

            <Route
              path="/"
              render={({location}) =>
                !loggedIn ? (
                  <Home onLogIn={onLogIn} />
                ) : (
                  <Redirect
                    to={{
                      pathname: '/new',
                      state: {from: location},
                    }}
                  />
                )
              }
            />
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
