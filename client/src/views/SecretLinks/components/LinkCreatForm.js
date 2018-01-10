import React, { Component } from 'react';
import validUrl from 'valid-url';
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

	handleSubmit = (e) => {
		e.preventDefault ();
		console.log (this.state.inputRef);
		console.log ('1111', validUrl.isUri (this.state.inputRef));
	};
	onInputChange = (e) => {
		this.setState ({inputRef : e.target.value});
	};

	render () {
		return (
			<Form onSubmit={ (e) => this.handleSubmit (e) }>
				<FormGroup>
					<Label>Target URL</Label>
					<Row>
						<Col sm={ 10 }>
							<Input onChange={ (e) => this.onInputChange (e) } name={ 'url' }
							       placeholder={ 'enter your secret web address' }/>
						</Col>
						<Col sm={ 2 }>
							<Button>Submit</Button>
						</Col>
					</Row>
				</FormGroup>

			</Form>
		);
	}

}

export default LinkCreatForm;
