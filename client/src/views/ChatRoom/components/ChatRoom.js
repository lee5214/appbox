import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import socketIOClient from 'socket.io-client';
import { sendPubChatMsgs } from 'actions';
import uuid from 'uuid'
import {
	Container,
	Button,
	CardImg,
	Col,
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
			userId : '',
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
	initSocket = () => {
		socket.on('connect', () => {
			console.log('connected')
		})
		this.setState({userId:uuid.v4()})
	}
	componentDidMount(){
		this.initSocket()
	}

	showMessages = (data) => {
		return (
			<ListGroupItem key={ data.inputMessage }>
				<MessageBlock data={data} />
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

	render () {
		return (
			<Container className="animated fadeIn">
				<Row>
					<Col xs={ 12 }>
						<ListGroup className={style.messagesContainer}>
							{ this.state.pubChatMessages.map ((msg) => this.showMessages (msg)) }
						</ListGroup>

						<Form className={ 'input-group' } onSubmit={ (e) => {this.handleSubmit (e);} }>
							<Col md="12">
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
							</Col>
						</Form>
					</Col>
					<Col xs={ 12 } lg={ 12 } xl={ 6 }>

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
