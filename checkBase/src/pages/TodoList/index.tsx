import * as React from 'react'
import ListItems from './listItems'
import AddItem from './AddItem'
import './todoList.scss'

interface IProps {
    test?: any
}
interface IState {
    test?: any
    list?: any
    finished?: any
    lastId?: any
}
class TodoList extends React.Component<IProps, IState> {
    constructor(props: IProps, state: IState) {
        super(props)

        this.state = {
            list: [{
                id: 0,
                name: '吃饭',
                finished: false
            }, {
                id: 1,
                name: '睡觉',
                finished: false
            }, {
                id: 2,
                name: '打豆豆',
                finished: false
            }],
            finished: 0,
            lastId: 2
        }
    }

    receiveItem = (newitem) => {
        const allTask = this.state.list
        allTask.push(newitem)
        const lastIndex = allTask.length > 1 ? allTask.length - 1 : 0
        const lastId = lastIndex === 0 ? 0 : allTask[lastIndex].id
        this.setState({
            lastId
        })
        this.setState({
            list: allTask
        })
    }

    updateFinished = (todoItem) => {
        let sum = 0
        this.state.list.forEach((item) => {
            if (item.id === todoItem.id) {
                item.finished = todoItem.finished
            }
            if (item.finished === true) {
                sum++
            }
        })
        this.setState({
            finished: sum
        })
    }

    updateTotal = (delId) => {
        const obj = this.state.list.filter(item => item.id !== delId)
        this.setState({
            list: obj
        })
        const newItems = obj.filter(item => item.finished === true)
        const len = newItems.length
        this.setState({
            finished: len

        })
    }

    render() {
        return (
            <div className='todoListContainer'>
                <h2>TodoList</h2>
                <p>共{this.state.list.length}项</p>
                <p>已完成：{this.state.finished}项</p>

                <ul>
                    {this.state.list.map((item, index) =>
                        <ListItems
                            item={item}
                            sendFinished={this.updateFinished.bind(this)}
                            sendDelete={this.updateTotal.bind(this)}
                            key={index}
                        />
                    )}
                </ul>
                <AddItem addItem={this.receiveItem} num={this.state.lastId} />
            </div>
        )
    }
}

export default TodoList