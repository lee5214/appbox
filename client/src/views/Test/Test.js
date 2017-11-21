import React, { Component } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Col, Input, Label, Row } from 'components';

class Text extends Component {

	render () {
		return (
			<Row>
				<Col xs={ 4 }>
					<h1>TL;DR</h1>
					<p className='small text-uppercase'>
						<strong>
							This is a test
						</strong>
					</p>
					<Card>
						<CardHeader>
							Card with switch <Label outline bsStyle={'primary'}>aaa</Label>
							<Label className="switch switch-sm switch-text switch-info float-right mb-0">
								<Input type="checkbox" className="switch-input" value={'on'}/>
								<span className="switch-label" data-on="On" data-off="Off"></span>
								<span className="switch-handle"></span>
							</Label>
						</CardHeader>
						<CardBody>
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
							tincidunt ut
							laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud
							exerci tation
							ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
						</CardBody>
					</Card>
				</Col>
			</Row>
		);
	}
}

export default Text;
