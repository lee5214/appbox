import React, { Component } from 'react';
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

import classes from './Test.scss'
class Text extends Component {

	constructor (props) {
		super (props);
		this.state = {
			modal : false,
			large : false,
			small : false,
			primary : false,
			success : false,
			warning : false,
			danger : false,
			info : false,
			img_lg : '',
			img_thumbnail : '',
			start : false,
		};
	}

	toggle = () => {
		this.setState ({
			modal : !this.state.modal,
		});
	};

	toggleLarge = () => {
		this.setState ({
			large : !this.state.large,
		});
	};

	toggleMusic () {
		this.setState ({start : !this.state.start});
	}

	render () {
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
									        onClick={ this.toggleLarge }>Read</Button>
								</Col>
							</Row>
						</CardHeader>


						{ /*<Card>*/ }
						{ /*<CardHeader>*/ }
						{ /*<i className="fa fa-align-justify"></i>*/ }
						{ /*{ headline.main }*/ }
						{ /*<div>*/ }
						{ /*{ section_name }*/ }
						{ /*</div>*/ }
						{ /*<hr/>*/ }
						{ /*<Button onClick={ this.toggleLarge }>Read</Button>*/ }
						{ /*</CardHeader>*/ }
						{ /*</Card>*/ }


						<Modal isOpen={ this.state.large } toggle={ this.toggleLarge }
						       className={ 'modal-lg ' + this.props.className }>
							<ModalHeader toggle={ this.toggleLarge }>

							</ModalHeader>
							<ModalBody style={ {height : '100%'} }>
								<div style={ {height : '80vh', widht : '100vw'} }>
									<iframe width="0" height="0"
									        src="https://www.youtube.com/embed/ZHGN3ViWrns?autoplay=1"
									        frameborder="0"
									        allowfullscreen>
									</iframe>
									<hr/>
								</div>
							</ModalBody>
							<ModalFooter>
							</ModalFooter>
						</Modal>
						<Button onClick={ e => this.toggleMusic (e) }>Toggle Music</Button>
						{ this.state.start ? <div>
							<iframe width="0" height="0" src="https://www.youtube.com/embed/ZHGN3ViWrns?autoplay=1"
							        frameborder="0" allowfullscreen>
							</iframe>
							<hr/>
						</div> : null }
					</Card>
				</Row>
			</div>
		);
	}
}

export default Text;
