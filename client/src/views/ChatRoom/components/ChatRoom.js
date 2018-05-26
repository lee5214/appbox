import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendPubChatMsgs } from 'actions';
import ChatSideBar from './ChatSideBar';
import { USER_CONNECTED } from '../assets/socketEvents';
import MessageBlock from "./MessageBlock";
import MessagesContainer from './MessagesContainer';
import { Button, Col, Container, Form, Input, InputGroup, InputGroupButton, ListGroupItem, Row, } from 'reactstrap';

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
	}

	componentDidMount () {
		this.props.socket.on ('receive msg', (msg) => {
			console.log ('msg', msg);
			this.setState ({pubChatMessages : [ msg, ...this.state.pubChatMessages ]});
		});
		this.props.socket.on ('userList update', (userList) => {
			this.setState ({userList});
			console.log ('userlist update----', userList);
		});

	}

	// IMPORTANT
	// When dealing with parent/child relation, keep in mind that the componentDidMount is called on the
	// children before it is called on the parent
	// so at this time the redux state has not been received as props
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
		this.props.socket.emit (
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
			<Container className="animated fadeIn align-self-center">
				<Row>
					<Col xs={ 3 }>
						{
							this.props.currentUserInfo ? <ChatSideBar socket={ this.props.socket }
							                                          currentUserInfo={ this.props.currentUserInfo }
							/> : <div>loading</div>
						}
					</Col>

					<Col xs={ 9 }>

						<MessagesContainer message={ this.state.pubChatMessages }/>

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
	};
};
export default connect (mapStateToProps) (ChatRoom);
