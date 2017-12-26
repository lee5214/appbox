import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import socketIOClient from 'socket.io-client';
import { sendPubChatMsgs } from 'actions';
import uuid from 'uuid';
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
import style from './ChatRoom.scss';
import MessageBlock from "./MessageBlock";

const socket = socketIOClient ('http://localhost:4000');

class ChatRoom extends Component {

	constructor (props) {
		super (props);
		this.state = {
			guestId : '',
			newMsg : '',
			currentUser : '',
			pubChatMessages : [],
			inputMessage : '',
		};

		/*
		 * IMPORTANT
		 * put socket client listener in constructor, not render function
		 * otherwise it may be called multiple times
		 */
		socket.on ('receive msg', (msg) => {
			this.setState ({pubChatMessages : [...this.state.pubChatMessages, msg]});
			//alert(msg)
			//this.setState({msg:msg})
			//document.body.style.backgroundColor = color
		});
	}
	componentWillMount () {
		this.initSocket ();

		let guestId = uuid.v4 ().split ('-').pop ();
		this.setState ({guestId});
	}

	initSocket = () => {

		socket.on ('connect', () => {
			console.log ('connected');
		});

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
			displayName = `guest-${this.state.guestId}`;

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

	render () {
		return (
			<Container className="animated fadeIn">
				<Row>
					<Col xs={ 3 }>
						<h4>Contacts</h4>
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
