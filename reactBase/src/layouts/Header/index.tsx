import * as React from 'react'
import './index.scss'
import { Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import Logo from './img/andOrLab-logo.png'
interface IState {
  current?: string
}
export interface IProps {
  empty?: any
  height?: string
  theme?: any
  // style?: any
}
export default class NavBar extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      current: 'home'
    }
  }
  handleClick = (e) => {
    // console.log('click ', e)
    this.setState({
      current: e.key,
    })
  }
  render() {
    const menuStyle = {
      height: this.props.height!,       // 自定义导航栏高度
      lineHeight: this.props.height!    // 确保在自定义高度下导航内容保持在导航条内部上下居中
    }
    return (
        <Menu theme={this.props.theme} style={menuStyle} onClick={this.handleClick} selectedKeys={[this.state.current!]} mode='horizontal'>
          <Menu.Item style={menuStyle} key='Project'>
            <NavLink  to='/'>
              <img src={Logo} alt='AndOrLab' width='90px' height='30px'/>
            </NavLink>
          </Menu.Item>
          <Menu.Item style={menuStyle} key='home'>
            <NavLink  to='/'>
            <Icon type='appstore-o' />
              TodoList
            </NavLink>
          </Menu.Item>
          <Menu.Item style={menuStyle} key='book'>
            <NavLink  to='/book'>
              <Icon type='appstore-o' />
              图书管理
            </NavLink>
          </Menu.Item>
          <Menu.Item style={menuStyle} key='demo'>
            <NavLink  to='/demo'>
              <Icon type='appstore-o'/>
              demo
            </NavLink>
          </Menu.Item>
        </Menu>
    )
  }
}