import React, { Component } from 'react';
import {FormGroup,Form,Label,Col,Input,Row, Button} from 'reactstrap'

class SecretLinks extends Component {
	constructor (props) {
		super (props);
	}

	render () {
		<Form>
			<FormGroup>
				<Label sm={2}>Target URL</Label>
				<Col sm={10}>
					<Input type={'url'} name={'url'} placeholder={'enter your secret web address'}/>
				</Col>
			</FormGroup>
			<Button>Submit</Button>
		</Form>
	}
}

export default SecretLinks;
