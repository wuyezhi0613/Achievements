import * as React from 'react'
import { Button, Modal, message } from 'antd'
import AddBook from './addBooks'
import BookDetail from './BookDetail'
import HttpClient from '../../utils/HttpClient'
import './bookManagement.scss'
export interface IProps {
    test?: any
}

interface IState {
    test?: any
    loading?: boolean
    tableDataSource?: any
    isChangePage?: any
    isAdd?: boolean
    selectedTableRows?: any,
    updateBookId?: any

}

export default class BookManagement extends React.Component<IProps, IState> {
    constructor(props: IProps, state: IState) {
        super(props)
        this.state = {
            loading: false,
            tableDataSource: [],
            isChangePage: false,
            isAdd: false,
            selectedTableRows: [],
            updateBookId: ''


        }
    }

    componentDidMount() {
        this.getAllData()
    }

    getAllData = () => {
        this.setState({
            loading: true,
        })
        HttpClient.get('booksAPI/books', {}).then((res: any) => {
            if (res!.data!.length > 0) {
                this.setState({
                    tableDataSource: res.data,
                    loading: false,
                })
            }

        })
    }

    delDataFn = (delBookId) => {
        HttpClient.get(`booksAPI/books/${delBookId}/delete`, {}).then((res) => {
            if (res) {
                message.success('删除成功')
                this.setState({
                    selectedTableRows: []
                })
            }
        }).then(() => {
            this.getAllData()
        })
    }


    modifyBookManagement = () => {
        this.setState({
            isChangePage: !this.state.isChangePage,
        }, () => {
            if (!this.state.isChangePage) {
                this.getAllData()
            }
        })
    }

    addBookFn = (e) => {
        e.preventDefault()
        this.modifyBookManagement()
        this.setState({
            isAdd: true
        })
    }

    bookDetailFn(bookId) {
        this.modifyBookManagement()
        this.setState({
            isAdd: false,
            updateBookId: bookId
        })
    }

    showDeleteConfirm(updateBookId) {
        const self = this
        const confirm = Modal.confirm
        confirm({
            title: '提示',
            content: '确定要删除该记录？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                self.delDataFn(updateBookId)
            },
            onCancel() {
                console.log('Cancel')
            },
        })

    }

    rowSelection = {
        loading: true,
        onSelect: (record, selected, selectedRows) => {
            if (selected) {
                this.setState({
                    updateBookId: record._id.$oid
                })
            }
            this.setState({
                selectedTableRows: selectedRows,
            })
        },
        getCheckboxProps: record => ({
            id: record._id.$oid,

        }),
    }

    render() {
        const bookManagement = (
            <div className='AllBookContainer'>
                <Button className='bookManagement-btn' style={{ marginLeft: '40px' }} type='primary'
                        onClick={this.addBookFn}>新增图书</Button>
                <ul>
                    <li className='BookTitle'>
                        <span className='bookItem'>名称</span>
                        <span className='bookItem'>内容</span>
                        <span className='bookItem'>标签</span>
                        <span className='bookItem'>作者</span>
                        <span className='bookItem'>操作</span>
                    </li>
                    {this.state.tableDataSource.map(item => {
                        return (
                            <li key={item._id.$oid}>
                                <span className='bookItem'>{item.name}</span>
                                <span className='bookItem'>{item.content}</span>
                                <span className='bookItem'>{item.labels}</span>
                                <span className='bookItem'>{item.author}</span>
                                <span className='bookItem'>
                                    <Button type='danger' className='bookManagement-btn' onClick={this.showDeleteConfirm.bind(this, item._id.$oid)}>删除</Button>
                                    <Button type='primary' className='bookManagement-btn' onClick={this.bookDetailFn.bind(this, item._id.$oid)}>详情</Button>
                                </span>

                            </li>
                        )

                    })}

                </ul>
            </div>
        )

        const { isChangePage, isAdd } = this.state
        return (
            <div className='bookManagement-manager'>
                {isChangePage ?
                    (isAdd ? (
                        <AddBook changePage={this.modifyBookManagement} />) :
                        <BookDetail changePage={this.modifyBookManagement} receivedBookId={this.state.updateBookId} />
                    ) :
                    bookManagement}
            </div>)
    }
}
