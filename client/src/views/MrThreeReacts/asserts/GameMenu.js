import React from 'react'
import {Row,Col,Button} from 'reactstrap'
import styles from './GameMenu.scss'
const GameMenu = () => {
	return (
		<div>
			{/*<div className={ 'position-absolute' }>
				<button onClick={ () => {this.setState ({gameStatus : 'playing'});} }>start</button>
				<p>Energy: { this.Param.energy }</p>
				<p>Distance: { this.Param.distance }</p>
				<p>level: { this.Param.level }</p>
				<p>Delta: { this.deltaTime }</p>
				<p>cameraZ</p>
				<button onClick={ () => this.setState ({cameraZ : 3000}) }>3000</button>
				<button onClick={ () => this.setState ({cameraZ : 200}) }>300</button>
				<div className={ '' }>
					<p>{ this.state.message }</p>
				</div>
				{ this.state.topScores.map (item =>
					<li key={ item.score }>{ item.score } - { item.displayName }</li>
				)}
			</div>

			<Row className={styles.buttonGroup}>
				<Col>
					<Button outline color={ this.state.fullScreen ? 'secondary' : 'primary' } size="md"
					        className={ styles.button } onClick={ this.toggleFullScreen }>
						{ this.state.fullScreen ? 'Exit Full Screen' : 'Enter Full Screen' }
					</Button>
					<Button outline color={ this.state.fullScreen ? 'secondary' : 'primary' } size="md"
					        className={ styles.button } onClick={ this.modalToggle }>
						{this.state.gameStatus ==='waiting'?'continue':('ending'?'as':'asd')}
					</Button>
				</Col>
			</Row>*/}
		</div>
	)
}
export default GameMenu;
