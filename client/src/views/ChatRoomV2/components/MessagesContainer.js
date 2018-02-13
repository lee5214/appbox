import React, { Component } from 'react';
import { CardImg, Col, Media, Row } from 'reactstrap';
import { Panel } from 'react-bootstrap';
import style from './ChatRoom.scss';
import moment from 'moment';
import uuid from 'uuid'
class MessagesContainer extends Component {


	componentDidMount = () => {
		console.log(this.props.messagesList)
	}
	showMessages = (data) => {
		return (
			<Media key={ uuid.v4() }>
				<Media left className={ 'm-2' }>
					<div className={ 'avatar avatar-md' }>
						<CardImg className={ 'img-avatar' } src={ data.senderImg }/>
					</div>
				</Media>
				<Media body>
					<div className={ style.chatMessageContent }>
						<strong>{ data.inputMessage }</strong>
					</div>

					<div className={style.chatMessageFooter}>
						<span className={ 'mr-2 text-white' }><strong>{ data.displayName }</strong></span>
						<small>{ `at ${ moment (data.time).local ().format ('MM/DD HH:MM') }` }</small>

					</div>
				</Media>
			</Media>
		);
	};

	render () {
		return (
			<Panel className={ style.chatPanel }
			       header={ (
				       <Row>
					       <Col sm={ 6 } xs={ 12 }>
						       <h5>Chat in 	&lt; Public Room &gt; </h5>
					       </Col>
				       </Row>
			       ) }
			       footer={ (
				       <Row></Row>
			       ) }
			>
				{ this.props.messagesList.map ((msg) => this.showMessages (msg)) }
			</Panel>
		);
	}
}

export default MessagesContainer;

