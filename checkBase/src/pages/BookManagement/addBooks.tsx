import * as React from 'react'
import { Button, Form, Input, message } from 'antd'
import HttpClient from '../../utils/HttpClient'


const FormItem = Form.Item
export interface IProps {
    test?: any,
    changePage?: any
}

interface IState {
    test?: any
    name?: any
    content?: any
    labels?: any
    author?: any
}

export default class AddBook extends React.Component<IProps, IState> {
    constructor(props: IProps, state: IState) {
        super(props)
        this.state = {
            name: '',
            content: '',
            labels: '',
            author: ''
        }
    }


    handleName = (e) => {
        e.preventDefault()
        this.setState({
            name: e.target.value
        })

    }

    handleContent = (e) => {
        e.preventDefault()
        this.setState({
            content: e.target.value
        })

    }

    handleLabels = (e) => {
        e.preventDefault()
        this.setState({
            labels: e.target.value
        })

    }

    handleAuthor = (e) => {
        e.preventDefault()
        this.setState({
            author: e.target.value
        })

    }

    addBooks = () => {
        const addBook = `name=${this.state.name}&content=${this.state.content}&labels=${this.state.labels}&author=${this.state.author}`
        HttpClient.get(`booksAPI/books/add?${addBook}`, {}).then((res: any) => {
            if (res.data) {
                message.success('操作成功')
            }
        })
    }




    render() {

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        }
        return (
            <div className='addBookContainer'>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label='名称'
                    >
                        <Input placeholder='请输入名称' onChange={this.handleName} className='input' />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='内容'
                    >
                        <Input placeholder='请输入内容' onChange={this.handleContent} className='input' />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='标签'
                    >
                        <Input placeholder='请输入标签' onChange={this.handleLabels} className='input' />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='作者'
                    >
                        <Input placeholder='请输入作者' onChange={this.handleAuthor} className='input' />
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button onClick={this.addBooks} type='primary' className='bookManagement-btn'>确定</Button>
                        <Button onClick={this.props.changePage} className='bookManagement-btn'>返回</Button>
                    </FormItem>
                </Form>

            </div>)

    }
}
