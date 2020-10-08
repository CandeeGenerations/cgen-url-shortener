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
import {getConfig} from '../../api'
import {ConfigModel} from '../../models/models'
import ShortCode from '../ShortCodes/ShortCode'

const {Header, Content, Footer} = Layout

export const ConfigContext = React.createContext<ConfigModel | null>(null)

const App = () => {
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)
  const [config, setConfig] = useState<ConfigModel | null>(null)

  const loadConfig = async () => {
    const response = await getConfig()

    setConfig(response)
    setLoading(false)
  }

  useEffect(() => {
    setLoggedIn(localStorage.getItem(authTokenKey) !== null)
    loadConfig()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onLogIn = () => setLoggedIn(true)

  const onLogOut = () => {
    localStorage.removeItem(authTokenKey)
    setLoggedIn(false)
  }

  return loading ? (
    <div style={{padding: 10}}>Loading..</div>
  ) : (
    <ConfigContext.Provider value={config}>
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
                path="/codes/:id"
                render={({location}) =>
                  loggedIn ? (
                    <ShortCode />
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
    </ConfigContext.Provider>
  )
}

export default App
