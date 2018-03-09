import React,{Component} from 'react'
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import styles from './GameMenu.scss'
class GameMenu extends Component{
	constructor (props){
		super(props);
		this.state={
			modalIsOpen:false,
		}
	}

	toggleFullScreen = () => {
		document.body.classList.toggle ('sidebar-hidden');
		document.body.classList.toggle ('aside-menu-hidden');
		this.setState ({fullScreen : !this.state.fullScreen});
	};

	modalToggle = () => {
		this.setState ({modalIsOpen : !this.state.modalIsOpen});
	};

	render(){
		return (

				<div className={styles.gameMenuContainer}>
					<button onClick={ () => {
						this.props.changeGameStatus ('playing');
					} }>playing
					</button>
					<p>Energy: { this.props.Param.energy || null }</p>
					<p>Distance: { this.props.Param.distance || null}</p>
					<p>level: { this.props.Param.level || null}</p>
					<p>Delta: { Math.floor(1000/this.props.deltaTime) }</p>
					<p>cameraZ</p>
					<button onClick={ () => this.props.setCameraZ(1000) }>1000</button>
					<button onClick={ () => this.props.setCameraZ(300) }>300</button>
					{/*<div className={ '' }>
						<p>{ this.state.message || null }</p>
					</div>*/}
					{ this.props.topScores.map (item =>
						<li key={ item.score }>{ item.score } - { item.displayName }</li>,
					) }


				<Row className={ styles.buttonGroup }>
					<Col>
						{/*<Button size="md"
						        className={ styles.button } onClick={ this.toggleFullScreen }>
							{ this.state.fullScreen ? 'Exit Full Screen' : 'Enter Full Screen' }
						</Button>*/}
						<Button outline color={ this.state.fullScreen ? 'secondary' : 'primary' } size="md"
						        className={ styles.button }
						        onClick={ this.modalToggle }
						>About
						</Button>
						{/*<Button outline color={ this.state.fullScreen ? 'secondary' : 'primary' } size="md"
						        className={ styles.button }
						        onClick={()=>{this.resetGame ();this.setState ({gameStatus : 'playing'});} }
						>
							{ this.state.gameStatus === 'waiting' ? 'Start' : ('gameover' ? 'Again' : 'Pause') }
						</Button>*/}
					</Col>
				</Row>

				<Modal isOpen={ this.state.modalIsOpen } toggle={ this.modalToggle }>
					<ModalHeader toggle={ this.toggle }>About</ModalHeader>
					<ModalBody>
						This is a 3D pilot game I migrated to my app using react/threejs/es6/firebase, so far it seems
						work well.
						Using your cursor to control the plane, try to stay as long as possible, game level will
						increase based on the time lasted.
						And you are able to leave bombs for other players.

					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={ this.toggle }>Do Something</Button>{ ' ' }
						<Button color="secondary" onClick={ this.toggle }>Cancel</Button>
					</ModalFooter>
				</Modal>
			</div>
		)
	}
}
export default GameMenu;
