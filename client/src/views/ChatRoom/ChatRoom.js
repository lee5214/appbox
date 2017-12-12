import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import socketIOClient from 'socket.io-client';
import { sendPubChatMsgs } from 'actions';
import { ListGroup,ListGroupItem,Button, Card, CardImg, Col, Form, Input, InputGroup, InputGroupButton, Row } from 'reactstrap';
import moment from 'moment';

const socket = socketIOClient ('http://localhost:4000');

class ChatRoom extends Component {
	constructor (props) {
		super (props);
		this.state = {
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

	showMessages = (data) => {
		return (
			<ListGroupItem key={ data.inputMessage }>
				<div className={ 'avatar avatar-sm' }>
					<CardImg className={ 'img-avatar' } src={ data.from }/>
				</div>

				<p>{ moment (data.time).local ().format ('MM/DD HH:MM') }</p>
				<div>{ data.inputMessage }</div>
			</ListGroupItem>
		);
	};
	onInputChange = (input) => {
		this.setState ({inputMessage : input.target.value});
	};
	handleSubmit = (e) => {
		e.preventDefault ();
		let userImg;
		if (this.props.userInfo) {
			userImg = this.props.userInfo.local.avatar;
		} else {
			userImg = '/img/avatars/1.jpg';
		}
		socket.emit (
			'send msg',
			{
				inputMessage : this.state.inputMessage,
				from : userImg || '',
				time : new Date (),
			});
		this.setState ({inputMessage : ''});

	};

	render () {
		return (
			<div className="animated fadeIn">
				<Row>
					<Col xs={12} lg={12} xl={6}>
						<ListGroup style={{height: '500px',overflow:'scroll',backgroundColor:'#1A1A1A'}}>
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
					<Col xs={12} lg={12} xl={6}>

					</Col>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userInfo : state.userInfo || null,
		pubChatMessages : state.messages.pubChatMessages,
	};
};
const mapPropsToDispatch = (dispatch) => {
	return bindActionCreators ({sendPubChatMsgs}, dispatch);
};

export default connect (mapStateToProps, mapPropsToDispatch) (ChatRoom);
