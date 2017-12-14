import React, { Component } from 'react';
import { Card, CardImg, Col, Container, Row } from 'reactstrap';
import {Tooltip} from 'react-bootstrap'
import moment from 'moment';
import style from './ChatRoom.scss'

class MessageBlock extends Component {

	render () {
		const data = this.props.data;
		return (
			<Container>
				<Row>
					<Col xs={ 1 }>
						<div className={ 'avatar avatar-sm' }>
							<CardImg className={ 'img-avatar' } src={ data.from }/>
						</div>
					</Col>
					<Col xs={ 2 }>
						<span>{ data.displayName }</span>
						<p>{ moment (data.time).local ().format ('MM/DD HH:MM') }</p>

					</Col>
					<Col>
						<Card className={style.singleMessageBlock}>{ data.inputMessage }</Card>
						<Tooltip placement="right" className="in" id="tooltip-right">
							Tooltip right
						</Tooltip>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default MessageBlock;
