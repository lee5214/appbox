import React, { Component } from 'react';

export default class ChatSideBar extends Component {
	// handleUserList = (user) => {
	// 	//return <div id={ user }>{ user }</div>;
	//
	// 	// console.log('try',this.state.userList.set(1,'a'))
	// 	// for(let [key,value] of this.state.userList){
	// 	// 	console.log('a')
	//
	// 	return <div> { user[ 'displayName' ] }</div>;
	// };
	constructor(props){
		super(props)
		this.state = {
			// userId: this.props.userList.userId,
			// userImg: this.props.userList.userImg,
			// displayName: this.props.userList.displayName,
			userList: {},
		}

	}
	componentDidMount () {
		const socket = this.props.socket;
		socket.on ('userList update', (userList) => {
			this.setState ({userList});
			console.log ('userlist update----', userList);
		});
		console.log(this.props.currentUserInfo.local)
		socket.emit (
			'new user join',
			{
				userId : this.props.currentUserInfo._id,
				userImg : this.props.currentUserInfo.local.userImg,
				displayName : this.props.currentUserInfo.local.displayName,
			});
		//
		// if (this.props.currentUserInfo) {
		// 	const {_id, local} = this.props.currentUserInfo;
		// 	this.setState ({
		// 			userId : _id,
		// 			userImg : local.avatar,
		// 			displayName : local.displayName,
		// 		},
		// 		// callback, fire after setState completed (it's not fire immediately )
		// 		() => {
		// 			socket.emit (
		// 				'new user join',
		// 				{
		// 					userId : this.state.userId,
		// 					userImg : this.state.userImg,
		// 					displayName : this.state.displayName,
		// 				});
		// 		},
		// 	);
		// }
	}

	render () {
		return (
			<div>
				{ Object.keys (this.state.userList).map ((key) =>
					{return <div key={key}> { this.state.userList[ key ][ 'displayName' ] }</div>
				}
				//handleUserList (this.state.userList[ key ]),
				) }
				{ /*{ this.state.userList.map ((user) => this.handleUserList (user)) }*/ }
			</div>
		);
	}
}
