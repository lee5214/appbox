import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Col,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	Row,
} from 'components';

const socket = socketIOClient('http://localhost:4000')


//TODO form knowledge review
class Test extends Component {

	constructor (props) {
		super (props);
		this.state = {
			largeModal : false,
			img_lg : '',
			img_thumbnail : '',
			musicStart : false,
			endpoint : 'http://localhost:4000',
			color : 'empty',
		};

	}

	toggleLargeModal = () => {
		this.setState ({
			largeModal : !this.state.largeModal,
		});
	};

	toggleMusic = () => {
		this.setState ({musicStart : !this.state.musicStart});
	};

	send = () => {
		socket.emit ('msg', 'msg');
	};
	send2 = () => {
		socket.emit ('change color', 'red');
	};


	render () {
		socket.on ('msg', (msg) => {
			alert(msg)
			//this.setState({msg:msg})
			//document.body.style.backgroundColor = color
		});
		socket.on ('change color', (color) => {
			//this.setState({msg:msg})
			document.querySelector('.app-footer').style.backgroundColor = color
		});

		return (
			<div>
				<Row>
					<Card xs={ 12 } md={ 6 }>
						<CardHeader>
							<Row>
								<Col xs={ 10 } lg={ 10 }>

								</Col>
								<Col xs={ 2 } lg={ 2 }>
									<Button className={ 'float-right' } outline color="primary" size="sm"
									        onClick={ this.toggleLargeModal }>Read</Button>
								</Col>
							</Row>
						</CardHeader>
						<Modal isOpen={ this.state.largeModal } toggle={ this.toggleLargeModal }
						       className={ 'modal-lg ' + this.props.className }>
							<ModalHeader toggle={ this.toggleLargeModal }>

							</ModalHeader>
							<ModalBody style={ {height : '100%'} }>
								<div style={ {height : '80vh', widht : '100vw'} }>
									<iframe width="100%" height="100%"
									        src="https://www.youtube.com/embed/ZHGN3ViWrns?autoplay=1"
									        frameBorder="0"
									        allowFullScreen>
									</iframe>
									<hr/>
								</div>
							</ModalBody>
							<ModalFooter>
							</ModalFooter>
						</Modal>
						<Button onClick={ e => this.toggleMusic (e) }>Toggle Music</Button>
						{ this.state.musicStart ? <div>
							<iframe width="0" height="0" src="https://www.youtube.com/embed/ZHGN3ViWrns?autoplay=1"
							        frameBorder="0" allowFullScreen>
							</iframe>
							<hr/>
						</div> : null }
					</Card>
				</Row>

				<Row>
					{ this.state.msg }
					{ this.state.color }
					<Button onClick={this.send }>change</Button>
					<Button onClick={this.send2 }>change</Button>
				</Row>
			</div>
		);
	}
}

export default Test;
