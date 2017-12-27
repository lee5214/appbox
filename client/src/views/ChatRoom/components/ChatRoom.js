import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import socketIOClient from 'socket.io-client';
import { sendPubChatMsgs } from 'actions';
import uuid from 'uuid';
import _ from 'lodash';
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
			userId : '',
			userImg : '',
			displayName : '',
			newMsg : '',
			currentUser : '',
			pubChatMessages : [],
			inputMessage : '',
			userList : [ {displayName : 'jojo'} ],
		};

		/*
		 * IMPORTANT
		 * put socket client listener in constructor, not render function
		 * otherwise it may be called multiple times
		 */
		socket.on ('receive msg', (msg) => {
			this.setState ({pubChatMessages : [ ...this.state.pubChatMessages, msg ]});
			// alert(msg)
			// this.setState({msg:msg})
			// document.body.style.backgroundColor = color
		});

		socket.on ('userList update', (userList) => {
			this.setState ({userList});
			console.log (this.state.userList);
		});
	}

	setUser (userImg, displayName) {
		this.setState ({
			userImg,
			displayName,
		});
	}

	componentDidMount () {
		let userId = uuid.v4 ().split ('-').pop ();
		this.setState ({userId});
		if (this.props.currentUserInfo) {
			const {avatar, displayName} = this.props.currentUserInfo.local;
			this.setUser (avatar, displayName);
		} else {
			let ran = _.random (1, 4);
			console.log ('ran', ran);
			console.log (`/img/avatars/${ran}.jpg`);
			this.setUser (`/img/avatars/${ran}.jpg`, `guest-${this.state.userId}`,);
		}
		this.initSocket ();
	}

	initSocket = () => {

		// socket.on ('connect', () => {
		// 	console.log ('connected');
		// 	//return {};
		// });

		// socket.emit (
		// 	'new user join',
		// 	{
		// 		userImg : this.state.userImg,
		// 		displayName : this.state.displayName,
		// 	});

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
		let userImg, displayName;
		if (this.props.currentUserInfo) {
			userImg = this.props.currentUserInfo.local.avatar;
			displayName = this.props.currentUserInfo.local.displayName;
		} else {
			userImg = '/img/avatars/1.jpg';
			displayName = `guest-${this.state.userId}`;

		}
		socket.emit (
			'send msg',
			{
				inputMessage : this.state.inputMessage,
				displayName : displayName,
				from : userImg || '',
				time : new Date (),
			});
		this.setState ({inputMessage : ''});

	};
	handleUserList = (user) => {
		return <div>{ user.displayName }</div>;
	};
	updateUserList = (method, userId) => {

	};

	render () {
		return (
			<Container className="animated fadeIn">
				<Row>
					<Col xs={ 3 }>
						{ this.state.userList.map ((user) => this.handleUserList (user)) }
					</Col>

					<Col xs={ 9 }>
						<ListGroup className={ style.messagesContainer }>
							{ this.state.pubChatMessages.map ((msg) => this.showMessages (msg)) }
						</ListGroup>
						<Col md="12">
							<Form className={ 'input-group' } onSubmit={ (e) => {this.handleSubmit (e);} }>
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
	return {
		currentUserInfo : state.currentUserInfo || null,
		pubChatMessages : state.chatRoom.pubChatMessages,
	};
};
const mapPropsToDispatch = (dispatch) => {
	return bindActionCreators ({sendPubChatMsgs}, dispatch);
};

export default connect (mapStateToProps, mapPropsToDispatch) (ChatRoom);
