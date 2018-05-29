import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import TopicList from '../views/topic-list'
import TopicDetail from '../views/topic-detail'
import TestApi from '../views/test/api-test'

export default () => [
  <Route path="/" render={() => <Redirect to="/index" />} exact key="first" />,
  <Route path="/index" component={TopicList} key="list" />,
  <Route path="/detail" component={TopicDetail} exact key="detail" />,
  <Route path="/test" component={TestApi} exact key="test" />,
]
