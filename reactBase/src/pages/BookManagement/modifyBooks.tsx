import React from 'react'
import { Button, Card, Form, Input } from 'antd'
import HttpClient from '@utils/HttpClient'
const FormItem = Form.Item


export interface IProps {
  test?: any
  bookData?: any
  changePage?: any
}

interface IState {
  test?: any
  name?: string
  author?: string
  labels?: string
  content?: string
}

export default class ModifyBooks extends React.PureComponent<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)

    this.state = {
      name: this.props.bookData[0].name,
      author: this.props.bookData[0].author,
      labels: this.props.bookData[0].labels,
      content: this.props.bookData[0].content
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

  getBookInfo = (e) => {
    e.preventDefault()
    const id = this.props.bookData[0]._id["$oid"]
    HttpClient.get(`/booksAPI/books/?id=${id}`, {}).then((res: any) => {
      const resData = res.data[0]
      if (resData) {
        this.setState({
          name: resData.name,
          author: resData.author,
          labels: resData.labels,
          content: resData.content
        })
      }
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
      <Card title='图书详情'
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
            <Button style={{ marginLeft: 8 }} onClick={this.props.changePage}>返回</Button>
          </FormItem>
        </Form>
      </Card>
    )
  }
}
