import * as React from 'react'
import { Table, Button } from 'antd'
import HttpClient from '../../utils/HttpClient'
const columns = [
    {
        title: '名称',
        dataIndex: 'name'
    },
    {
        title: '内容',
        dataIndex: 'content'
    },
    {
        title: '标签',
        dataIndex: 'labels'
    },
    {
        title: '作者',
        dataIndex: 'author'
    }]
export interface IProps {
    test?: any
    changePage?: any
    receivedBookId?: any
}

interface IState {
    test?: any
    bookDetail?: any
    loading?: boolean


}

export default class BookDetail extends React.Component<IProps, IState> {
    constructor(props: IProps, state: IState) {
        super(props)
        this.state = {
            bookDetail: [],
            loading: false
        }
    }

    componentDidMount() {
        this.getBookDetail()
    }

    getBookDetail = () => {
        this.setState({
            loading: true
        })
        HttpClient.get(`booksAPI/books/${this.props.receivedBookId}`, {}).then((res: any) => {
            if (res!.data!.length > 0) {
                this.setState({
                    bookDetail: res.data,
                    loading: false
                })
            }
        })
    }

    rowSelection = {
        loading: true,
        getCheckboxProps: record => ({
            id: record._id.$oid,

        })
    }

    render() {

        const { bookDetail } = this.state
        return (
            <div className='bookDetailContainer'>
                <Button className='bookManagement-btn' type='primary' onClick={this.props.changePage}>返回</Button>
                <Table
                    rowKey={record => record.id}
                    rowSelection={this.rowSelection}
                    columns={columns}
                    loading={this.state.loading}
                    dataSource={bookDetail}
                />
            </div>)

    }
}
