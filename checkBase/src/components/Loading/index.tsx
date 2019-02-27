import * as React from 'react'
import { Spin } from 'antd'
export default class MyLoadingComponent extends React.Component {
  render() {
    const height = window.document.body.clientHeight - (48 + 69)
    return(
      <Spin>
        <div style={{height, textAlign: 'center'}}/>
      </Spin>
    )
  }
}