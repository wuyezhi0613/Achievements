import * as React from 'react'
import { Input, Button } from 'antd'

interface IProps {
    num?: any
    addItem?: (content?: any) => void
}

interface IState {
    items?: any
    inputValue?: any
}
class AddItem extends React.Component<IProps, IState> {
    constructor(props: IProps, state: IState) {
        super(props)
        this.state = {
            items: {},
            inputValue: ''
        }

    }

    handleChange = (e) => {
        e.preventDefault()
        if (e.target.value) {
            this.setState({
                inputValue: e.target.value
            })
        }
    }

    handleClick = (e) => {
        e.preventDefault()
        const len = this.props.num + 1
        const newId = len > 0 ? len : 0
        const value = this.state.inputValue
        if (value !== '') {
            const obj = {
                id: newId,
                name: value,
                finished: false
            }
            if (this.props.addItem) {
                this.props.addItem(obj)
            }
        }
        this.setState({
            inputValue: ''
        })

    }

    render() {
        return (
            <div>
                <Input type='text' placeholder='请输入内容' onChange={this.handleChange} value={this.state.inputValue} style={{ marginRight: '15px', width: '300px' }} />
                <Button onClick={this.handleClick} type='primary'> 添加</Button>
            </div>
        )
    }
}

export default AddItem