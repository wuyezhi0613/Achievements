import * as React from 'react'
import { Button } from 'antd'
interface IProps {
	item?: any
	sendFinished?: (content?: any) => void
	sendDelete?: (content?: any) => void

}

interface IState {
	items?: any
}
class ListItems extends React.Component<IProps, IState> {
	constructor(props: IProps, state: IState) {
		super(props)

	}

	handleFinished = () => {
		const finished = this.props.item.finished
		const status = (finished === false ? true : false)
		const obj = {
			id: this.props.item.id,
			name: this.props.item.name,
			finished: status
		}
		if (this.props.sendFinished) {
			this.props.sendFinished(obj)
		}

	}

	handleDelete = () => {
		if (this.props.sendDelete) {
			this.props.sendDelete(this.props.item.id)
		}

	}

	render() {
		const item = this.props.item

		const unfinishContent = {
			color: 'black',
			marginRight: '10px'
		}

		const finishContent = {
			textDecoration: 'line-through',
			marginRight: '10px'
		}

		const unfinishSpan = {
			width: '20px',
			height: '20px',
			display: 'inline-block',
			background: '#fff',
			border: '1px solid #ccc',
			marginRight: '10px'
		}
		const finishSpan = {
			width: '20px',
			height: '20px',
			display: 'inline-block',
			background: '#eee',
			marginRight: '10px'
		}
		const contentStyle = item.finished === false ? unfinishContent : finishContent
		const spanStyle = item.finished === false ? unfinishSpan : finishSpan


		return (
			<li key={item.id} style={{ listStyle: 'none', margin: '10px' }}>
				<span style={spanStyle}
					onClick={this.handleFinished}
				/>
				<span style={contentStyle}>{item.name}</span>
				<Button style={{ cursor: 'pointer' }} onClick={this.handleDelete} type='primary'>删除</Button>
			</li>
		)
	}
}

export default ListItems