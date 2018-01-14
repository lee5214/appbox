import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

class LinkCreatForm extends Component {
	constructor (props) {
		super (props);
		this.state = {
			inputRef : '',
		};
	}

	// validUrl = (url) => {
	//
	//
	// };

	// handleSubmit = (e) => {
	// 	e.preventDefault ();
	// 	console.log (this.state.inputRef);
	// 	console.log ('1111', validUrl.isUri (this.state.inputRef));
	// };
	onInputChange = (e) => {
		this.setState ({inputRef : e.target.value});
	};
	handleUrlSubmit = (e) => {
		this.props.handleSubmit (e, this.state.inputRef);
		this.setState ({inputRef : ''});
	};

	render () {
		return (
			<Form onSubmit={ this.handleUrlSubmit }>
				<FormGroup>
					<Label>Target URL</Label>
					<Row>
						<Col sm={ 12 }>
							<Input onChange={ (e) => this.onInputChange (e) }
							       name={ 'url' }
							       value={ this.state.inputRef }
							       placeholder={ 'enter your secret web address' }/>
						</Col>
					</Row>
					<Row>
						<Col>
							{ this.props.errorMessage }
						</Col>
					</Row>
					<br/>
					<Row>
						<Col sm={ 2 }>
							<Button>Generate</Button>
						</Col>
					</Row>
				</FormGroup>
			</Form>
		);
	}

}

export default LinkCreatForm;
