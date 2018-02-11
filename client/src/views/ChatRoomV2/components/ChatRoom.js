import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendPubChatMsgs } from 'actions';
import ChatSideBar from './ChatSideBar';

//import MessageBlock from "./MessageBlock";
import MessagesContainer from './MessagesContainer';
import { Button, Col, Container, Form, Input, InputGroup, InputGroupButton, ListGroupItem, Row, } from 'reactstrap';

class ChatRoom extends Component {

	constructor (props) {
		super (props);
		this.state = {
			//socket : null,
			messageNumber : 0,
			userId : '',
			userImg : '',
			displayName : '',
			newMsg : '',
			currentUser : '',
			pubChatMessages : [],
			inputMessage : '',
			userList : null,
			messagesList : [],
			currentMessages: [],
		};
	}

	componentDidMount () {
		firebase.database().ref('chatroomV2-messages/').on('child_added', (snapshot)=>{
			const messagesSnapshot = snapshot.val();
			if (messagesSnapshot){
				this.setState({messagesList:[...this.state.messagesList,messagesSnapshot],messageNumber: this.state.messageNumber+1})
			}
		})
	}

	// IMPORTANT
	// When dealing with parent/child relation, keep in mind that the componentDidMount is called on the
	// children before it is called on the parent
	// so at this time the redux state has not been received as props


	onInputChange = (input) => {
		this.setState ({inputMessage : input.target.value});
	};

	handleSubmit = (e) => {
		e.preventDefault ();
		const nextMessage = {
			id : this.state.messageNumber+1,
			inputMessage : this.state.inputMessage,
			displayName : this.props.currentUserInfo.local.displayName,
			senderImg : this.props.currentUserInfo.local.avatar,
			time : new Date (),
		}
		firebase.database().ref('chatroomV2-messages/'+nextMessage.id).set(nextMessage)

		this.setState({inputMessage:''})
	};

	render () {
		return (
			<Container className="animated fadeIn align-self-center">
				<Row>
					<Col xs={ 3 }>
						{
							this.props.currentUserInfo ? <ChatSideBar //socket={ this.props.socket }
							                                          currentUserInfo={ this.props.currentUserInfo }
							/> : <div>loading</div>
						}
					</Col>

					<Col xs={ 9 }>

						<MessagesContainer messages={ this.state.messagesList }/>

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
