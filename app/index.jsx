import React from 'react'
import { render } from 'react-dom'

import './static/css/common.less'

class Hello extends React.Component {
  render() {
    return (
      <p>Hello Shayyee</p>
    )
  }
}

render(<Hello/>, document.getElementById('root'))