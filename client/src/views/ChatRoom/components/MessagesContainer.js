import React, { Component } from 'react';
import { CardImg, Col, Media, Row } from 'reactstrap';
import { Panel } from 'react-bootstrap';
import style from './ChatRoom.scss';
import moment from 'moment';

const sample = {
	a4434eaee28223a8baab185 :
		{
			'displayName' :
				"Cong",
			'userAvatar' :
				"https://scontent.xx.fbcdn.net/v/t1.0-1/c8.0.50.50/p50x50/600622_10202058405571393_1193000151_n.jpg?oh=c59e021798cea127e1fb00f69579bbfe&oe=5ABA8DAC",
			'userId' :
				"5a4434eaee28223a8baab185",
		},
};

export default class MessagesContainer extends Component {

	showMessages = (data) => {
		return (
			<Media key={ data.inputMessage }>
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

	renderChatMessage = (message, leftAligned) => (
		<div>
			<Media
				key={ '' }
			>
				{
					leftAligned && (
						<Media.Left>
							<div className={ 'avatar avatar-sm' }>
								<CardImg className={ 'img-avatar' }
								         src={ message.senderImg }
								         showStatus
								         statusPlacement='bottom'
								/>
							</div>
						</Media.Left>
					)
				}
				<Media.Body>
					<div className={ '' }>
						{ message.inputMessage }
					</div>
					{
						leftAligned ?
							(
								<div className={ '' }>
			<span className='text-white'>
			{ message.displayName }
			</span>
									<small>
										{ ` at  ${message.time}` }
									</small>
								</div>
							) :
							(
								<div className={ '' }>
									<small>
										{ `$ ` }
									</small>
									<span className='text-white'>
			{ message.displayName }
			</span>
								</div>
							)
					}
				</Media.Body>
				{
					!leftAligned && (
						<Media.Right>
							<div className={ 'avatar avatar-sm' }>
								<CardImg className={ 'img-avatar' }
								         src={ message.senderImg }
								         showStatus
								         statusPlacement='bottom'
								/>
							</div>
						</Media.Right>
					)
				}
			</Media>

		</div>

	);

	render () {
		return (
			<Panel className={ style.chatPanel }
			       header={ (
				       <Row>
					       <Col sm={ 6 } xs={ 12 }>
						       <h5></h5>
					       </Col>
				       </Row>
			       ) }
			       footer={ (
				       <Row></Row>
			       ) }
			>
				{ this.props.message.map ((msg) => this.showMessages (msg)) }
			</Panel>
		);
	}
}

{/*<Media*/}
{/*key={ '' }*/}
{/*>*/}
{/*{*/}
{/*leftAligned && (*/}
{/*<Media.Left>*/}
{/*<div className={ 'avatar avatar-sm' }>*/}
{/*<CardImg className={ 'img-avatar' }*/}
{/*src={ message.User.Avatar }*/}
{/*showStatus*/}
{/*statusPlacement='bottom'*/}
{/*/>*/}
{/*</div>*/}
{/*</Media.Left>*/}
{/*)*/}
{/*}*/}
{/*<Media.Body>*/}
{/*<div className={ '' }>*/}
{/*{ message.Content }*/}
{/*</div>*/}
{/*{*/}
{/*leftAligned ?*/}
{/*(*/}
{/*<div className={ '' }>*/}
{/*<span className='text-white'>*/}
{/*{ message.displayName }*/}
{/*</span>*/}
{/*<small>*/}
{/*{ ` at  ` }*/}
{/*</small>*/}
{/*</div>*/}
{/*) :*/}
{/*(*/}
{/*<div className={ '' }>*/}
{/*<small>*/}
{/*{ `$ ` }*/}
{/*</small>*/}
{/*<span className='text-white'>*/}
{/*{ message.displayName }*/}
{/*</span>*/}
{/*</div>*/}
{/*)*/}
{/*}*/}
{/*</Media.Body>*/}
{/*{*/}
{/*!leftAligned && (*/}
{/*<Media.Right>*/}
{/*<div className={ 'avatar avatar-sm' }>*/}
{/*<CardImg className={ 'img-avatar' }*/}
{/*src={ message.userImg }*/}
{/*showStatus*/}
{/*statusPlacement='bottom'*/}
{/*/>*/}
{/*</div>*/}
{/*</Media.Right>*/}
{/*)*/}
{/*}*/}
{/*</Media>*/}
