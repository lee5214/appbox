import React, { Component } from 'react';
import { Media, Card, CardImg, Col, Container, Row } from 'reactstrap';
import {Tooltip} from 'react-bootstrap'
import moment from 'moment';
import style from './ChatRoom.scss'

class MessageBlock extends Component {

	render () {
		const data = this.props.data;
		return (
			<Container>
				<Row>
					<Media left>
						<div className={ 'avatar avatar-sm' }>
							<CardImg className={ 'img-avatar' } src={ data.from }/>
						</div>
					</Media>
					<Col xs={ 'auto' }>
						<Col>
							<Card className={style.singleMessageBlock}>{ data.inputMessage }</Card>
							<Tooltip placement="right" className="in" id="tooltip-right">
								Tooltip right
							</Tooltip>
						</Col>
						<Col>
							<span>{ moment (data.time).local ().format ('MM/DD HH:MM') } <span style={{fontSize:'20px'}}>{ data.displayName } </span></span>
						</Col>
					</Col>

				</Row>
			</Container>
		);
	}
}

export default MessageBlock;
