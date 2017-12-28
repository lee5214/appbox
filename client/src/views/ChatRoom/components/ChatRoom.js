import React, { Component } from 'react';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { sendPubChatMsgs } from 'actions';
import {
	Button,
	Col,
	Container,
	Form,
	Input,
	InputGroup,
	InputGroupButton,
	ListGroup,
	ListGroupItem,
	Row,
} from 'reactstrap';
import ChatSideBar from './ChatSideBar';
import { USER_CONNECTED } from '../asserts/socketEvents';
import style from './ChatRoom.scss';
import MessageBlock from "./MessageBlock";

// const socket = window.io.connect('http://localhost:4000')
const socket = socketIOClient ('http://localhost:4000');

// import socket from '../Socket'

class ChatRoom extends Component {
	constructor (props) {
		super (props);
		this.state = {
			socket : null,
			userId : null,//this.props.currentUserInfo._id,
			userImg : '',
			displayName : '',
			newMsg : '',
			currentUser : '',
			pubChatMessages : [],
			inputMessage : '',
			userList : null,
		};
		/*
		 * IMPORTANT
		 * put socket client listener in constructor, not render function
		 * otherwise it may be called multiple times
		 */
		socket.on ('receive msg', (msg) => {
			console.log('msg',msg)
			this.setState ({pubChatMessages : [ ...this.state.pubChatMessages, msg ]});
		});
		socket.on ('userList update', (userList) => {
			this.setState ({userList});
			console.log ('userlist update----', userList);
		});
	}

	componentWillMount () {}

	// IMPORTANT
	// When dealing with parent/child relation, keep in mind that the componentDidMount is called on the
	// children before it is called on the parent
	// so at this time the redux state has not been received as props
	componentDidMount () {
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

	componentWillReceiveProps (nextProps) {

	}

	// async setup () {
	// 	let uImg,
	// 		uName,
	// 		uId = await uuid.v4 ().split ('-').pop ();
	// 	//if (this.props.currentUserInfo) {
	// 		const {avatar, displayName} = this.props.currentUserInfo.local;
	// 		uImg = avatar;
	// 		uName = displayName;
	// 		//uId = this.props.currentUserInfo
	// 	//} else {
	// 	// 	const ran = await _.random (1, 4);
	// 	// 	uImg = await `/img/avatars/${ran}.jpg`;
	// 	// 	uName = await `guest-${uId}`;
	// 	// }
	// 	this.setState ({
	// 		userId : uId,
	// 		userImg : uImg,
	// 		displayName : uName,
	// 	});
	// 	const a = await this.state.displayName
	// 	console.log ('disp', a);
	// 	const n = await this.state.userImg, k = await this.state.displayName
	//
	// 	socket.emit (
	// 		'new user join',
	// 		{
	// 			userId : uId,
	// 			userImg : n,
	// 			displayName : k
	// 		});
	// 	console.log ('state', this.state);
	// }


	initSocket = () => {
		// socket.on ('connect', () => {
		// 	console.log ('connected');
		// 	//return {};
		// });


		// socket.on ('receive msg', (msg) => {
		// 	this.setState ({pubChatMessages : [...this.state.pubChatMessages, msg]});
		// 	//alert(msg)
		// 	//this.setState({msg:msg})
		// 	//document.body.style.backgroundColor = color
		// });

	};

	showMessages = (data) => {
		return (
			<ListGroupItem key={ data.inputMessage }>
				<MessageBlock data={ data }/>
			</ListGroupItem>
		);
	};

	onInputChange = (input) => {
		this.setState ({inputMessage : input.target.value});
	};

	handleSubmit = (e) => {
		e.preventDefault ();
		// let userImg, displayName;
		// if (this.props.currentUserInfo) {
		// 	userImg = this.props.currentUserInfo.local.avatar;
		// 	displayName = this.props.currentUserInfo.local.displayName;
		// } else {
		// 	userImg = '/img/avatars/1.jpg';
		// 	displayName = `guest-${this.state.userId}`;
		// }
		socket.emit (
			'send msg',
			{
				inputMessage : this.state.inputMessage,
				displayName : this.props.currentUserInfo.local.displayName,
				senderImg : this.props.currentUserInfo.local.avatar,
				time : new Date (),
			});
		this.setState ({inputMessage : ''});
	};


	render () {
		return (

			<Container className="animated fadeIn">
				<Row>
					<Col xs={ 3 }>
						{
							this.props.currentUserInfo ? <ChatSideBar socket={ socket }
							                                          currentUserInfo={ this.props.currentUserInfo }
							/> : <div>loading</div>
						}
					</Col>
					<Col xs={ 9 }>
						{/*<ChatWindow></ChatWindow>*/}
						<ListGroup className={ style.messagesContainer }>
							{ this.state.pubChatMessages.map ((msg) => this.showMessages (msg)) }
						</ListGroup>
						<Col md="12">
							<Form className={ 'input-group' } onSubmit={ (e) => { this.handleSubmit (e); } }>
								<InputGroup>
									<Input type="text" id="input1-group2" name="input1-group2"
									       placeholder={ 'city name' }
									       onChange={ (e) => this.onInputChange (e) }
									       value={ this.state.inputMessage }/>
									<InputGroupButton>
										<Button color={ 'primary' } type={ 'submit' }><i className="fa fa-search"></i>
											Send</Button>
									</InputGroupButton>
								</InputGroup>

							</Form>
						</Col>
					</Col>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	console.log ('currentUserInfo', state.currentUserInfo);
	return {
		currentUserInfo : state.currentUserInfo,
		pubChatMessages : state.chatRoom.pubChatMessages,
	};
};
// const mapPropsToDispatch = (dispatch) => {
// 	return bindActionCreators ({sendPubChatMsgs}, dispatch);
// };

export default connect (mapStateToProps) (ChatRoom);
