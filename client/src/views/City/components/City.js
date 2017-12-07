import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { CityList, SearchBar } from './index';
import { Colors } from 'consts';

class City extends Component {
	constructor (props) {
		super (props);
		this.state = {quote : ''};
	}

	render () {
		return (
			<div className="animated fadeIn">
				<Row>
					<Col/>
					<Col xs={ 'auto' }>
						<SearchBar/>
					</Col>
					<Col/>
				</Row>
				<CityList/>
			</div>
		);
	}
}

export default connect () (City);
