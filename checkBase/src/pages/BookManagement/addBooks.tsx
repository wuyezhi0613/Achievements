import React from 'react'
import { Button, Card, Form, Input, message } from 'antd'
import HttpClient from '@utils/HttpClient'

const FormItem = Form.Item

export interface IProps {
  test?: any
  changePage?: any
}

interface IState {
  test?: any
  name?: string
  author?: string
  labels?: string
  content?: string
}

export default class AddBooks extends React.PureComponent<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)

    this.state = {
      name: '',
      author: '',
      labels: '',
      content: ''
    }
  }

  handleNameAdd = (e) => {
    this.setState({
      name: e.target.value,
    })
  }

  handleAuthorAdd = (e) => {
    this.setState({
      author: e.target.value,
    })
  }

  handleLabelsAdd = (e) => {
    this.setState({
      labels: e.target.value,
    })
  }

  handleContentAdd = (e) => {
    this.setState({
      content: e.target.value,
    })
  }

  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1
  }

  addBookFn = (e) => {
    e.preventDefault()
    const inputs = document.getElementsByTagName('input')
    const len = inputs.length
    let params = ''
    let str = ''
    for (let i = 0; i < len; i++) {
      params += inputs[i].value + '&'
    }
    if (params !== '') {
      const arr = params.split('&')
      str += 'name=' + arr[0] + '&'
      str += 'author=' + arr[1] + '&'
      str += 'labels=' + arr[2] + '&'
      str += 'content=' + arr[3]
    }

    HttpClient.get('/booksAPI/books/add?' + str, {}).then((res: any) => {
      if (res) {
        message.success('添加成功', 3)
        this.props.changePage()
      }
    })
  }

  recoverFn = (e) => {
    e.preventDefault()
    this.setState({
      name: '',
      author: '',
      labels: '',
      content: ''
    })
  }

  render() {

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 12 },
      },
    }

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    }

    return (
      <Card title='新增图书'
        bordered={false}
      >
        <Form
          hideRequiredMark
        >
          <FormItem
            {...formItemLayout}
            label='书名'>
            <Input className='input' name='name' value={this.state.name}
              onChange={this.handleNameAdd} />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label='作者'>
            <Input className='input' name='author' value={this.state.author}
              onChange={this.handleAuthorAdd} />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label='标签'>
            <Input className='input' name='labels' value={this.state.labels} onChange={this.handleLabelsAdd} />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label='简介'>
            <Input className='input' name='content' value={this.state.content} onChange={this.handleContentAdd} />
          </FormItem>

          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type='primary' onClick={this.addBookFn}>
              提交
                        </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.recoverFn}>重置</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.props.changePage}>返回</Button>
          </FormItem>
        </Form>
      </Card>
    )
  }
}
