import React, { Component } from 'react';
import { Media, Row } from 'reactstrap';
import Divider from 'components/_Common/Divider/Divider';

export default class ChatSideBar extends Component {
	constructor (props) {
		super (props);
		this.state = {
			userTotal : 0,
			onlineUserList : {},
		};
	}
	componentDidMount(){
		this.setState({onlineUerList:this.props.users})
		console.log('online users list =>',this.props.users)
	}
	renderTotalNumber () {
		return (
			<Divider center>
				<h6 className={ 'mb-0' }>
					<strong>Total:
						<span className={ 'text-white ml-2' }>{ Object.keys(this.props.users).length}</span>
					</strong>
				</h6>
			</Divider>
		);
	}
	handleUserList (key) {

		return (
			<Row key={ key } className={ 'p-0 mt-2' }>
				<Media left>
					<div className={ 'avatar avatar-md mr-3' }>
						<img className={ 'img-avatar' } src={ this.props.users[ key ][ 'avatar' ] } alt={ '' }/>
					</div>
					<strong className={ 'text-white' }>{ this.props.users[ key ][ 'displayName' ] }</strong>
				</Media>
			</Row>
		);

	}

	render () {
		return (
			<div>
				<Row>
					<h4 className={ 'mb-0' }>Public Chat Room</h4>
				</Row>
				{ this.renderTotalNumber () }
				{ Object.keys (this.props.users).map ((key) => this.handleUserList (key),

					//handleUserList (this.props.users[ key ]),
				) }
				{ /*{ this.props.users.map ((user) => this.handleUserList (user)) }*/ }
			</div>
		);
	}
}
