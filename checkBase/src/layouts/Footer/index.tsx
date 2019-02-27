import * as React from 'react'
import { Layout } from 'antd'
import { FaHeart } from 'react-icons/fa'
const { Footer } = Layout
import './index.scss'
export default class BasicFooter extends React.Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        Summit Web Framework ©2018 Created <FaHeart style={{color: 'red'}} /> by AndorLab
      </Footer>
    )
  }
}