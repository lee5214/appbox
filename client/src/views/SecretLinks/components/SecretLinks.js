import React, { Component } from 'react';
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import LinkCreateForm from './LinkCreatForm'

class SecretLinks extends Component {
	constructor (props) {
		super (props);
	}
	render () {
		return (
			<LinkCreateForm/>
		);
	}
}

export default SecretLinks;
