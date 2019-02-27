import * as React from 'react'
import { Button, Input } from 'antd'
import './index.scss'
interface IProps {
  test?: any
  inputValue?: (content?: any) => void
}
export interface Item {
  id: string,
  checked: boolean,
  content: string
}
interface IState {
  item: Item
}
export default class AddItem extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      item: {
        id: '',
        checked: false,
        content: ''
      }
    }
  }
  addNewItem = (e) => {
    e.preventDefault()
    if (this.props.inputValue) {
      this.props.inputValue(this.state.item)
    }
  }

  getInputValue = (e) => {
    e.preventDefault()
    if (e.target.value) {
      const array = e.target.value.split(',')
      const myChecked = array[1] === 'true' ? true : false
      this.setState({
        item: {
          id: array[0],
          checked: myChecked,
          content: e.target.value
        }
      })
    }
  }

  render() {
    return (
      <div className='addItem-box'>
        <Input placeholder='TODO' onChange={this.getInputValue} />
        <Button type='primary' onClick={this.addNewItem}>添加</Button>
      </div>
    )
  }
}


