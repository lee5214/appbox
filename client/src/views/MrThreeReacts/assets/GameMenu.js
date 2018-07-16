import React, { Component } from 'react';
import { Button, Col, Modal, ModalBody, ModalHeader, Row, ListGroup,ListGroupItemHeading, ListGroupItem } from 'reactstrap';
import styles from './GameMenu.scss';
import { Divider,Loader } from 'components/';

class GameMenu extends Component {
	constructor (props) {
		super (props);
		this.state = {
			modalIsOpen : false,
			fullScreen : false,
			gameOver: false,
			destroyedBy: null,
			list: [],
		};
	}

	toggleFullScreen = () => {
		document.body.classList.toggle ('sidebar-hidden');
		document.body.classList.toggle ('aside-menu-hidden');
		this.setState ({fullScreen : !this.state.fullScreen});
	};

	modalToggle = () => {
		this.setState ({modalIsOpen : !this.state.modalIsOpen});
		this.waitingToggle ();
	};
	waitingToggle = () => {
		if (this.props.gameStatus === 'playing') {
			this.props.changeGameStatus ('waiting');
		} else if (this.props.gameStatus === 'waiting') {
			this.props.changeGameStatus ('playing');
		}
	};

	render () {
		return (
			<div className={ styles.gameMenuContainer }>
				{this.props.gameStatus==='gameOver'?<h1>You are destroyed by a bomb</h1>:null}
				{ this.props.topScores[ 0 ] ?
					<ListGroup className={ styles.scoreBoard }>
						<ListGroupItemHeading className={ styles.scoreBoardHeader }>
							Top 5
						</ListGroupItemHeading>
						{ this.props.topScores.map (item =>
							<ListGroupItem key={ `${item.displayName}-${item.score}` }>{ item.score } - { item.displayName }</ListGroupItem>,
						)}
					</ListGroup>
					: <Loader/>
				}
				{ /*<Row className={ styles.buttonGroup }>
				 <Col>
				 <Button outline color={ this.state.fullScreen ? 'secondary' : 'primary' }
				 className={ styles.button } onClick={ this.toggleFullScreen }>
				 { this.state.fullScreen ? 'Exit Full Screen' : 'Enter Full Screen' }
				 </Button>

				 <Button outline color={'danger'}
				 className={ styles.button }
				 onClick={ () => {
				 this.props.changeGameStatus ('playing');
				 } }>Start
				 </Button>
				 <Button outline color={'primary'}
				 className={ styles.button }
				 onClick={ this.modalToggle }
				 >About
				 </Button>
				 <Button outline color={ this.state.fullScreen ? 'secondary' : 'primary' } size="md"
				 className={ styles.button }
				 onClick={ () => {
				 this.props.resetGame ();
				 this.props.changeGameStatus ('playing');
				 } }
				 >
				 { this.state.gameStatus === 'waiting' ? 'Start' : ('gameover' ? 'Again' : 'Pause') }
				 </Button>
				 </Col>
				 </Row>*/ }
				<Row>
					<Button color={ 'danger' } size={ 'lg' }
					        className={ styles.buttonLarge }
					        onClick={ () => {
						        this.props.changeGameStatus ('playing');
						        this.props.sendGameMessage('');
					        } }>Start
					</Button>
				</Row>
				<Row>
					<Button outline color={ this.state.fullScreen ? 'secondary' : 'primary' }
					        size={ 'md' }
					        className={ styles.button } onClick={ this.toggleFullScreen }>
						{ this.state.fullScreen ? 'Exit Full Screen' : 'Enter Full Screen' }
					</Button>
				</Row>
				<Row>
					<Button outline color={ 'primary' }
					        size={ 'md' }
					        className={ styles.button }
					        onClick={ this.modalToggle }
					>About
					</Button>
				</Row>
				<Row>
					<Col xs={ '12' } className={ 'text-align-center' }>
						<span>camera options:</span>
						<Button outline className={ 'mx-2' } size={ 'sm' }
						        onClick={ () => this.props.setCameraZ (1000) }>1000</Button>
						<Button outline size={ 'sm' } onClick={ () => this.props.setCameraZ (300) }>300</Button>
					</Col>
				</Row>

				<Modal isOpen={ this.state.modalIsOpen } toggle={ this.modalToggle }>
					<ModalHeader toggle={ this.toggle }>About</ModalHeader>
					<ModalBody>
						This is a 3D pilot game I migrated to my app using react & threejs, so far it seems
						work well.
						Using your cursor to control the plane, try to stay as long as possible, game level will
						increase based on the time lasted.
						And you are able to generate bombs to destroy other players.

					</ModalBody>
					{ /*<ModalFooter>
					 <Button color="primary" onClick={ this.toggle }>Do Something</Button>{ ' ' }
					 <Button color="secondary" onClick={ this.toggle }>Cancel</Button>
					 </ModalFooter>*/ }
				</Modal>
			</div>
		);
	}
}

export default GameMenu;
