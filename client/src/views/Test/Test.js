import React, { Component } from 'react';
import TestField1 from './TestField1'
import TestField2 from './TestField2'
import TestField3 from './TestField3'
import TestField4 from './TestField4'
// import socketIOClient from 'socket.io-client';
// import {
// 	Button,
// 	Card,
// 	CardBody,
// 	CardFooter,
// 	CardHeader,
// 	Col,
// 	Input,
// 	Label,
// 	Modal,
// 	ModalBody,
// 	ModalFooter,
// 	ModalHeader,
// 	ModalTitle,
// 	Row,
// } from 'components';
//
// const socket = socketIOClient('http://localhost:4000')
//
// //TODO form knowledge review
import classes from './Test.scss'

class Test extends Component {
	render () {
		return (
			<div className={'animated fadeIn container d-flex'}>
				{/*<TestField1/>*/}
				{/*<TestField2/>*/}
				{/*<TestField3/>*/}
				<TestField4/>
			</div>
		);
	}
}

export default Test;
//
// 	constructor (props) {
// 		super (props);
// 		this.state = {
// 			largeModal : false,
// 			img_lg : '',
// 			img_thumbnail : '',
// 			musicStart : false,
// 			endpoint : 'http://localhost:4000',
// 			color : 'empty',
// 		};
// 		socket.on ('msg', (msg) => {
// 			console.log(msg)
// 			alert(msg)
// 			//this.setState({msg:msg})
// 			//document.body.style.backgroundColor = color
// 		});
// 		socket.on ('change color', (color) => {
// 			//this.setState({msg:msg})
// 			console.log(color)
// 			document.querySelector('.app-footer').style.backgroundColor = color
// 		});
// 	}
//
// 	toggleLargeModal = () => {
// 		this.setState ({
// 			largeModal : !this.state.largeModal,
// 		});
// 	};
//
// 	toggleMusic = () => {
// 		this.setState ({musicStart : !this.state.musicStart});
// 	};
//
// 	send = () => {
// 		socket.emit ('msg', 'msg');
// 	};
// 	send2 = () => {
// 		socket.emit ('change color', 'red');
// 	};
//
//
// 	render () {
//
//
// 		return (
// 			<div>
// 				<Row>
// 					<Card xs={ 12 } md={ 6 }>
// 						<CardHeader>
// 							<Row>
// 								<Col xs={ 10 } lg={ 10 }>
//
// 								</Col>
// 								<Col xs={ 2 } lg={ 2 }>
// 									<Button className={ 'float-right' } outline color="primary" size="sm"
// 									        onClick={ this.toggleLargeModal }>Read</Button>
// 								</Col>
// 							</Row>
// 						</CardHeader>
// 						<Modal isOpen={ this.state.largeModal } toggle={ this.toggleLargeModal }
// 						       className={ 'modal-lg ' + this.props.className }>
// 							<ModalHeader toggle={ this.toggleLargeModal }>
//
// 							</ModalHeader>
// 							<ModalBody style={ {height : '100%'} }>
// 								<div style={ {height : '80vh', widht : '100vw'} }>
// 									<iframe width="100%" height="100%"
// 									        src="https://www.youtube.com/embed/ZHGN3ViWrns?autoplay=1"
// 									        frameBorder="0"
// 									        allowFullScreen>
// 									</iframe>
// 									<hr/>
// 								</div>
// 							</ModalBody>
// 							<ModalFooter>
// 							</ModalFooter>
// 						</Modal>
// 						<Button onClick={ e => this.toggleMusic (e) }>Toggle Music</Button>
// 						{ this.state.musicStart ? <div>
// 							<iframe width="0" height="0" src="https://www.youtube.com/embed/ZHGN3ViWrns?autoplay=1"
// 							        frameBorder="0" allowFullScreen>
// 							</iframe>
// 							<hr/>
// 						</div> : null }
// 					</Card>
// 				</Row>
//
// 				<Row>
// 					{ this.state.msg }
// 					{ this.state.color }
// 					<Button onClick={this.send }>change</Button>
// 					<Button onClick={this.send2 }>change</Button>
// 				</Row>
// 			</div>
// 		);
// 	}

