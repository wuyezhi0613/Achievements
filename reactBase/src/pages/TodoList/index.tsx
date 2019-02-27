import * as React from 'react'
import AddItem, { Item as GZR } from './addItem'
import ItemList from './itemList'
import './index.scss'
interface IProps {
  test: any
}
interface IState {
  items: GZR[]
}


export default class TodoList extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      items: [
        { id: '1', content: '测试数据一', checked: false },
        { id: '2', content: '测试数据二', checked: true },
        { id: '3', content: '测试数据三', checked: false },
        { id: '4', content: '测试数据四', checked: true },
        { id: '5', content: '测试数据三', checked: false },
        { id: '6', content: '测试数据四', checked: true }
      ]
    }
  }

  handleItemAdd = (item: any) => {
    const itemArray = this.state.items
    itemArray.push(item)
    this.setState({
      items: itemArray
    }, () => {
      console.log('success')
    })
  }

  handleItemDelete = (key: any) => {
    const itemArray = this.state.items
    itemArray.map(item => {
      if (item.id === key) {
        const index = itemArray.indexOf(item)
        if (index > -1) {
          itemArray.splice(index, 1)
        }
      }
    })
    this.setState({
      items: itemArray
    })
  }
  render() {
    return (
      <div className='todoList-box'>
        <h1>TodoList</h1>
        {this.state.items.map(item => {
          return (
            <div key={item.id}>
              <ItemList inputItem={item} deleteFn={this.handleItemDelete} />
            </div>
          )
        })
        }
        <AddItem inputValue={this.handleItemAdd} />
      </div>
    )
  }
}