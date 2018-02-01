import React, { Component } from 'react';
import { Media, Row } from 'reactstrap';
import Divider from 'components/_Common/Divider/Divider';

export default class ChatSideBar extends Component {
	constructor (props) {
		super (props);
		this.state = {
			userTotal : 0,
			userList : {},
		};
	}

	componentDidMount () {
		const socket = this.props.socket;
		socket.on ('userList update', (userList) => {
			let userTotal = Object.keys (userList).length;
			this.setState ({userTotal, userList});
			console.log ('userlist update----', userList);
		});
		console.log (this.props.currentUserInfo.local);
		socket.emit (
			'new user join',
			{
				userId : this.props.currentUserInfo._id,
				userAvatar : this.props.currentUserInfo.local.avatar,
				displayName : this.props.currentUserInfo.local.displayName,
			});
	}


	renderTotalNumber () {
		return (
			<Divider center>
				<h6 className={ 'mb-0' }>
					<strong>Total:
						<span className={ 'text-white ml-2' }>{ this.state.userTotal }</span>
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
						<img className={ 'img-avatar' } src={ this.state.userList[ key ][ 'userAvatar' ] } alt={ '' }/>
					</div>
					<strong className={ 'text-white' }>{ this.state.userList[ key ][ 'displayName' ] }</strong>
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
				{ Object.keys (this.state.userList).map ((key) => this.handleUserList (key),

					//handleUserList (this.state.userList[ key ]),
				) }
				{ /*{ this.state.userList.map ((user) => this.handleUserList (user)) }*/ }
			</div>
		);
	}
}
