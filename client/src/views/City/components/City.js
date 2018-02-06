import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { CityList,CityDetail, SearchBar } from './index';
import PropTypes from 'prop-types';
import { Colors } from 'consts';

class City extends Component {
	render () {
		return (
			<div className="animated fadeIn">
				<Row className={'justify-content-center'}>
					<Col xs={ 'auto' }>
						<SearchBar/>
					</Col>
				</Row>
				<Row className={'justify-content-center'}>
					{ this.props.cityInfo.map (info => <CityDetail key={ info.cityWeather.id } info={ info }/>) }
				</Row>

			</div>
		);
	}
}

function mapStateToProps (state) {
	return {
		cityInfo : state.cityInfo,
	};
}

City.propTypes = {
	cityInfo : PropTypes.array.isRequired,
};

export default connect (mapStateToProps) (City);
