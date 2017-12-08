import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from '../pages/App'
import Home from '../pages/Home'
import List from '../pages/List'
import Detail from '../pages/Detail'
import NotFound from '../pages/NotFound'

class RouteMap extends React.Component {
  updateHandle() {
    console.log('每次router变化之后都会触发')
  }
  render() {
    return (
      <Router history={this.props.history} onUpdate={this.updateHandle.bind(this)}>
        <Route path='/' component={App}>
          <IndexRoute component={Home}/>
          <Route path='list' component={List}/>
          <Route path='detail/:id' component={Detail}/>
          <Route path="*" component={NotFound}/>
        </Route>
      </Router>
    )
  }
}

export default RouteMap