import React, { Component } from 'react';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { sendPubChatMsgs } from 'actions';
import ChatSideBar from './ChatSideBar';
import { USER_CONNECTED } from '../asserts/socketEvents';
import style from './ChatRoom.scss';
import MessageBlock from "./MessageBlock";
import { Panel } from 'react-bootstrap';
import MessagesContainer from './MessagesContainer'
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

const socket = socketIOClient ('http://localhost:4000');

class ChatRoom extends Component {
	constructor (props) {
		super (props);
		this.state = {
			socket : null,
			userId : '',
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
			console.log ('msg', msg);
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
	componentDidMount () {}

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

							<MessagesContainer message = {this.state.pubChatMessages} />

							<Row>
								<Col>
								<Form className={ 'input-group' } onSubmit={ (e) => { this.handleSubmit (e); } }>
									<InputGroup>
										<Input type="text" id="input-chat" name="input-chat"
										       placeholder={ 'start chat' }
										       onChange={ (e) => this.onInputChange (e) }
										       value={ this.state.inputMessage }/>
										<InputGroupButton>
											<Button color={ 'primary' } type={ 'submit' }>
												<i className="fa fa-search"/>
												Send</Button>
										</InputGroupButton>
									</InputGroup>
								</Form>
								</Col>
							</Row>

					</Col>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentUserInfo : state.currentUserInfo,
		//pubChatMessages : state.chatRoom.pubChatMessages,
	};
};
// const mapPropsToDispatch = (dispatch) => {
// 	return bindActionCreators ({sendPubChatMsgs}, dispatch);
// };

export default connect (mapStateToProps) (ChatRoom);
