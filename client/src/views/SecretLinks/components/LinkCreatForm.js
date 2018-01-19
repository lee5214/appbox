import React, { Component } from 'react';
import { Alert, Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

class LinkCreatForm extends Component {
	constructor (props) {
		super (props);
		this.state = {
			inputRef : '',
			isChecked : true,
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
	onUrlInputChange = (e) => {
		this.setState ({inputRef : e.target.value});
	};
	onCheckChange = () => {
		//console.log(this.state.isChecked)
		this.setState ({isChecked : !this.state.isChecked});
	};
	handleUrlSubmit = (e) => {
		//console.log(this.state.isChecked)
		this.props.handleSubmit (e, this.state.inputRef, this.state.isChecked);
		//isCheck stays user selected
		this.setState ({inputRef : ''});
	};

	render () {
		return (
			<Form onSubmit={ this.handleUrlSubmit }>
				<FormGroup>
					<Label>Enter URL</Label>
					<Row>
						<Col sm={ 12 }>
							<Input onChange={ (e) => this.onUrlInputChange (e) }
							       name={ 'url' }
							       value={ this.state.inputRef }
							       placeholder={ 'enter your secret web address' }/>
						</Col>
					</Row>
					<Row>
						<Col>
							<Alert className={ 'p-1 mb-1' }
							       color={ 'danger' }
							       isOpen={ this.props.errorMessage !== '' }
							>
								{ this.props.errorMessage }
							</Alert>
						</Col>
					</Row>
					<br/>

					<FormGroup row>
						<Col>
							<Button className={'mr-2'}>Generate</Button>
							<Label check>
								<Input onChange={ this.onCheckChange }
								       checked={ this.state.isChecked }
								       type="checkbox"/>{ ' ' }
								also go public
							</Label>

						</Col>
					</FormGroup>
				</FormGroup>
			</Form>
		);
	}

}

export default LinkCreatForm;
