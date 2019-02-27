import * as React from 'react'
import { Button, Checkbox } from 'antd'
import './index.scss'

interface IProps {
  inputItem?: any
  deleteFn?: (key: string) => void
}

interface IState {
  test?: any
}


export default class TodoItem extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
  }

  deleteItem = (e) => {
    e.preventDefault()
    if (this.props.deleteFn) {
      this.props.deleteFn(this.props.inputItem.id)
    }
  }
  render() {
    return (
      <div className='itemList-box'>
        <Checkbox checked={this.props.inputItem.checked} className='checkBox' />
        <span>{this.props.inputItem.content}</span>
        <Button size='small' type='danger' onClick={this.deleteItem}>删除</Button>
      </div>
    )
  }
}


