import * as React from 'react'
import HttpClient from '@utils/HttpClient'


interface IProps {
  test?: any
}

interface IState {
  userInfo?: any,
  ganks?: any
}

export default class AjaxTest extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      userInfo: {
        name: 'anonymous'
      }
    }
  }

  componentDidMount() {
    HttpClient.get('/api/0.4/?randomapi', {}).then((res: any) => {
      if (res!.results!.length > 0) {
        const length = res.results.length
        this.setState({
          userInfo: res.results[length - 1].user
        })
      }
    }, err => {
      console.log(err)
    })
    HttpClient.get('/gank/api/xiandu/category/wow', {}).then((res: any) => {
      if (res!.results!.length > 0) {
        this.setState({
          ganks: res.results
        })
      }
    })

  }
  /**
   * 删除书籍
   * @param {string} id id 唯一编号
   * @memberof HttpClientTest
   */
  deleteBook = (id: string) => {
    console.log(id)
  }

  render() {
    let userName = ''
    const userInfoName = this.state.userInfo.name
    if (userInfoName.first || userInfoName.last) {
      userName = `${userInfoName.first} ${userInfoName.last}`
    } else {
      userName = userInfoName
    }
    return (
      <div>
        {userName ? `hello: ${userName}` : false}
        <div>
          {
            this.state.ganks && this.state.ganks.map(item => {
              return <img key={item._id} src={item.icon} title={item.title} width={'100px'} height={'100px'} />
            })
          }
        </div>
      </div>
    )
  }
}