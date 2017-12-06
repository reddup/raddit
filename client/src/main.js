import React, { Component } from 'react';
import { render } from 'react-dom';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer } = Layout;

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import Grid from './components/grid';
import Login from './components/login';
import store from './store';

render(
  <Provider store={store}>
    <Router>
      <Layout>

        <Menu
          mode="horizontal"
        >
          <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
            <Menu.Item key="1">
              <Link to="/">
                <img src="./client/assets/images/raddit-logo.png" style={{ height: '35px', margin: '5px 0' }}/>
              </Link>{' '}
            </Menu.Item>
            <Menu.Item key="2" style={{ float: 'right' }}>
              <Link to={"/upvoted"}><Icon type="like-o" />Upvoted</Link>{' '}
            </Menu.Item>
            <Menu.Item key="3" style={{ float: 'right' }}>
              <Link to={"/saved"}><Icon type="save" />Saved</Link>{' '}
            </Menu.Item>
          </Menu>
        </Menu>
        <Layout style={{ overflow: 'scroll', height: '100vh' }}>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Switch>
              <Route path='/saved' render={(props) => (
                <Grid {...props} showType='Saved' />
              )}/>
              <Route path='/upvoted' render={(props) => (
                <Grid {...props} showType='Upvoted' />
              )}/>
              <Route path="/" component={Login} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            raddit ©2017
          </Footer>
        </Layout>
      </Layout>
    </Router>
  </Provider>, document.getElementById('content')
);
