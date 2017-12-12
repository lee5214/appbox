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
import classes from './City.scss';

class Modals extends Component {

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

	toggleSmall = () => {
		this.setState ({
			small : !this.state.small,
		});
	};

	togglePrimary = () => {
		this.setState ({
			primary : !this.state.primary,
		});
	};

	toggleSuccess = () => {
		this.setState ({
			success : !this.state.success,
		});
	};

	toggleWarning = () => {
		this.setState ({
			warning : !this.state.warning,
		});
	};

	toggleDanger = () => {
		this.setState ({
			danger : !this.state.danger,
		});
	};

	toggleInfo = () => {
		this.setState ({
			info : !this.state.info,
		});
	};

	getLargImg (web_url) {
		let xlarge = '';
		this.props.news.multimedia.map (img => {
			if (img.subtype === 'xlarge') {
				xlarge = 'https://www.nytimes.com/' + img.url;
			}
		});
		return xlarge !== '' ? <a href={ web_url }><img src={ xlarge } alt={ 'xlarge' }/></a> : null;
	}

	getThumbnail () {
		let thumbnail = '';
		this.props.news.multimedia.map (img => {
			if (img.subtype === 'thumbnail') {
				thumbnail = 'https://www.nytimes.com/' + img.url;
			}
		});
		return thumbnail !== '' ? <img src={ thumbnail } alt={ 'thumbnail' }/> : null;
	}

	formatCardBody (web_url, snippet) {
		return this.getThumbnail (web_url) ?
			<Row>
				<Col xs={ 3 } md={ 3 } lg={ 3 }>
					{ this.getThumbnail (web_url) }
				</Col>
				<Col xs={ 9 } md={ 9 } lg={ 9 }>
					{ snippet }
				</Col>
			</Row>
			:
			<Row>
				<Col xs={ 12 } lg={ 12 }>
					{ snippet }
				</Col>
			</Row>;
	}

	render () {
		const {web_url, snippet, headline, multimedia, keywords, pub_date, new_desk, section_name} = this.props.news;

		return (
			<Card xs={ 12 } md={ 6 } className={ classes.newsCard }>
				<CardHeader className={ classes.newsCardHeader }>
					<Row>
						<Col xs={ 10 } lg={ 10 }>
							{ headline.main }
						</Col>
						<Col xs={ 2 } lg={ 2 }>
							<Button className={ 'float-right mt-2' } outline color="primary" size="sm"
							        onClick={ this.toggleLarge }>Read</Button>
						</Col>
					</Row>
				</CardHeader>
				<CardBody className={ classes.newsCardBody }>
					{ this.formatCardBody (web_url, snippet) }
				</CardBody>

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
						{ headline.main }
					</ModalHeader>
					<ModalBody>
						{ this.getLargImg (web_url) }
						<hr/>
						{ snippet }

					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={ this.toggleLarge } href={ web_url }
						        target={ '_blank' }>
							Article
						</Button>
						<Button color="secondary" onClick={ this.toggleLarge }>Cancel</Button>
					</ModalFooter>
				</Modal>
			</Card>


		);
	}
}

export default Modals;
