import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGuestUser, fetchCurrentUser, sendPubChatMsgs, setMode, setMouseTrack } from 'actions';
import ChatSideBar from './ChatSideBar';
//import MessageBlock from "./MessageBlock";
import MessagesContainer from './MessagesContainer';
import { bindActionCreators } from 'redux';
import { Button, Col, Container, Form, Input, InputGroup, InputGroupButton, Row, } from 'reactstrap';
// import firebase from 'firebase';


const rootDB = firebase.database ().ref ().child ('chatroom/');

class ChatRoom extends Component {
	constructor (props) {
		super (props);
		this.state = {
			//socket : null,
			messageNumber : 0,
			inputMessage : '',
			users : null,
			messagesList : [],
			currentMessages : [],
			usersNumber : 0,
		};
	}

	// IMPORTANT
	// When dealing with parent/child relation, keep in mind that the componentDidMount is called on the
	// children before it is called on the parent
	// so at this time the redux state has not been received as props
	componentDidMount () {
		rootDB.child ('users').on ('value', (snapshot) => {
			const users = snapshot.val ();
			console.log ('user ref =>', users);
			this.setState ({users : users});
		});

		rootDB.child ('messages').on ('child_added', (snapshot) => {
			const messagesSnapshot = snapshot.val ();
			if (messagesSnapshot) {
				this.setState ({
					messagesList : //messagesSnapshot,
						[ messagesSnapshot, ...this.state.messagesList ],
					//messageNumber : this.state.messageNumber + 1,
				});
			}
		});

		// IMPORTANT
		// by default I wannt firebase auto detect user when component rendered
		// but to fetch current user info is an async call, so
		if (this.props.currentUserInfo) {
			rootDB.child ('users/' + this.props.currentUserInfo._id).set (this.props.currentUserInfo.local);
		}
	}

	// componentDidMount () {
	// 	if (this.props.currentUserInfo && !this.props.currentUserInfo.guest !== true) {
	// 		//firebase.database ().ref (userDB + this.props.currentUserInfo._id).set
	// (this.props.currentUserInfo.local); }   }

	// IMPORTANT for async data dispatched onto props
	componentWillReceiveProps = (nextProps) => {
		if (nextProps.currentUserInfo && !nextProps.currentUserInfo.guest !== true) {
			rootDB.child ('users/' + nextProps.currentUserInfo._id).set (nextProps.currentUserInfo.local);

			//firebase.database ().ref (userDB + nextProps.currentUserInfo._id).set (nextProps.currentUserInfo.local);
		}
	};
	// componentWillUpdate(nextProps, nextState){
	// 	if(nextProps.currentUserInfo !== this.props.currentUserInfo){
	// 		firebase.database ().ref (userDB + nextProps.currentUserInfo._id).set (nextProps.currentUserInfo.local);
	// 	}
	// }

	componentWillUnmount = () => {
		firebase.database ().ref (`chatroom/users/${this.props.currentUserInfo._id}`).remove ();
	};

	onInputChange = (input) => {
		this.setState ({inputMessage : input.target.value});
	};

	handleSubmit = (e) => {
		e.preventDefault ();
		const nextMessage = {
			//id : this.state.messageNumber + 1,
			inputMessage : this.state.inputMessage,
			displayName : this.props.currentUserInfo.local.displayName,
			senderImg : this.props.currentUserInfo.local.avatar,
			time : new Date (),
			online : false,
		};
		rootDB.child ('messages/').push (nextMessage);
		//rootDB.child('users/'+this.props.currentUserInfo._id).remove();


		this.setState ({inputMessage : ''});
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
						<MessagesContainer messagesList={ this.state.messagesList }/>
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
	return {currentUserInfo : state.currentUserInfo};
};

function mapDispatchToProps (dispatch) {
	return bindActionCreators ({fetchCurrentUser, setMode, setMouseTrack}, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps) (ChatRoom);
