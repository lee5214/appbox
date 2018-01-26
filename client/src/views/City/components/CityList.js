import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'weather-icons/css/weather-icons.css';
import CityDetail from './CityDetail';

class CityList extends Component {

	render () {
		return (
			<div>
				{ this.props.cityInfo.map (info => <CityDetail key={ info.cityWeather.id } info={ info }/>) }
			</div>
		);
	}
}





export default CityList;
