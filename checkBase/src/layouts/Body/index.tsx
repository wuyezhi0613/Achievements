import * as React from 'react'
import {Switch, Route } from 'react-router-dom'
import DynamicImport from '@components/DynamicImport'
import Loading from '@components/Loading'
import NoMatch from '@pages/NoMatch'

export default class Body extends React.Component {
  render() {
    return(
      <Switch>
        <Route exact path='/' component={TodoList} />
        <Route exact path='/book' component={BookManagement} />
        <Route exact path='/demo' component={Demo} />
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

// 路由： TodoList
const TodoList = (props) => (
  <DynamicImport load={() => import('@pages/TodoList')}>
    {(Component: any) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)
// 路由： 图书管理
const BookManagement = (props) => (
  <DynamicImport load={() => import('@pages/BookManagement')}>
    {(Component: any) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)
// 路由： TodoList
const Demo = (props) => (
  <DynamicImport load={() => import('@pages/Demo')}>
    {(Component: any) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)

