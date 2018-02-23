import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGuestUser, fetchCurrentUser, sendPubChatMsgs, setMode, setMouseTrack, } from 'actions';
import ChatSideBar from './ChatSideBar';
//import MessageBlock from "./MessageBlock";
import MessagesContainer from './MessagesContainer';
import { bindActionCreators } from 'redux';
import { Button, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupButton, Row } from 'reactstrap';
import fire from 'utils/fire';

const rootDB = fire.database ().ref ().child ('chatroom/');

class ChatRoom extends Component {
	constructor (props) {
		super (props);
		this.state = {
			inputMessage : '',
			users : null,
			messagesList : [],
			Anonymous : false,
		};
	}

	// IMPORTANT
	// When dealing with parent/child relation, keep in mind that the componentDidMount is called on the
	// children before it is called on the parent
	// so at this time the redux state has not been received as props
	componentDidMount () {
		console.log ('didmount');
		rootDB.child ('users').on ('value', (snapshot) => {
			const users = snapshot.val ();
			console.log ('user ref =>', users);
			this.setState ({users : users});
		});

		rootDB.child ('messages').limitToLast(100).on ('child_added', (snapshot) => {
			const messagesSnapshot = snapshot.val ();
			if (messagesSnapshot) {
				this.setState ({
					messagesList : //messagesSnapshot,
						[ messagesSnapshot, ...this.state.messagesList ],
					//messageNumber : this.state.messageNumber + 1,
				});
			}
		});
		// rootDB.child ('messages').limitToLast (100).on ('value', (snapshot) => {
		// 	const messagesSnapshot = snapshot.val ();
		// 	// if (messagesSnapshot) {
		// 	// 	this.setState ({
		// 	// 		messagesList : //messagesSnapshot,
		// 	// 			[ messagesSnapshot, ...this.state.messagesList ],
		// 	// 		//messageNumber : this.state.messageNumber + 1,
		// 	// 	});
		// 	// }
		// 	console.log('snap',messagesSnapshot)
		// 	if (messagesSnapshot) {
		// 		this.setState ({
		// 			messagesList : Object.keys (messagesSnapshot).map (key => messagesSnapshot[ key ] ),
		// 		}, console.log ('list',this.state.messagesList));
		// 	}
		//
		// });

		// IMPORTANT
		// by default I wannt firebase auto detect user when component rendered
		// but to fetch current user info is an async call, so
		if (this.props.currentUserInfo) {
			rootDB.child ('users/' + this.props.currentUserInfo._id).set (this.props.currentUserInfo.local);
			rootDB.child ('users/' + this.props.currentUserInfo._id).onDisconnect ().remove ();
		}
	}

	// IMPORTANT for async data dispatched onto props
	componentWillReceiveProps = (nextProps) => {
		if (nextProps.currentUserInfo && !nextProps.currentUserInfo.guest !== true) {
			rootDB.child ('users/' + nextProps.currentUserInfo._id).set (nextProps.currentUserInfo.local);
			rootDB.child ('users/' + nextProps.currentUserInfo._id).set (nextProps.currentUserInfo.local);
			rootDB.child ('users/' + nextProps.currentUserInfo._id).onDisconnect ().remove ();
		}
	};

	componentWillUnmount = () => {
		rootDB.child (`users/${this.props.currentUserInfo._id}`).remove ();
		// offline the messages DB
		// so that next time chatroom re-mounted, messages could be added correctly
		rootDB.off();
	};

	onInputChange = (input) => {
		this.setState ({inputMessage : input.target.value});
	};

	handleSubmit = (e) => {
		e.preventDefault ();
		const nextMessage = {
			inputMessage : this.state.inputMessage,
			displayName : this.state.Anonymous ? 'Anonymis' : this.props.currentUserInfo.local.displayName,
			senderImg : this.props.currentUserInfo.local.avatar,
			time : new Date (),
			online : false,
		};
		rootDB.child ('messages/').push (nextMessage);


		this.setState ({inputMessage : ''});
	};

	toggleAnonymous = () => {
		this.setState ({Anonymous : !this.state.Anonymous});
	};

	render () {
		return (
			<Container className="animated fadeIn align-self-center">
				<Row>
					<Col xs={ 3 }>
						{ this.state.users ? <ChatSideBar un={ this.state.users } users={ this.state.users }/> :
							<div>loading</div> }
					</Col>

					<Col xs={ 9 }>
						{ this.state.messagesList ?
							<MessagesContainer messagesList={ this.state.messagesList }/>
							: <div>Loading</div>
						}
						<Row>
							<Col>
								<Form className={ 'input-group' } onSubmit={ (e) => { this.handleSubmit (e); } }>
									<InputGroup>
										<InputGroupAddon className={ 'm-2' }>
											Anonymous？
											<Input addon type="checkbox" aria-label="Checkbox for Anonymous"
											       onChange={ this.toggleAnonymous }
											/>
										</InputGroupAddon>
										<Input type="text" id="input-chat" name="input-chat"
										       placeholder={ 'say something' }
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
	return {currentUserInfo : state.currentUserInfo};
};

function mapDispatchToProps (dispatch) {
	return bindActionCreators ({fetchCurrentUser, setMode, setMouseTrack}, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps) (ChatRoom);
