import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'weather-icons/css/weather-icons.css';
import CityCurrent from './CityCurrent';

class CityList extends Component {

	render () {
		// const data = {weather: this.props.cityWeatherInfo,news: this.props.cityNews}
		// console.log(this.props.cityInfo)
		return (
			<div>
				{ this.props.cityInfo.map (info => <CityCurrent key={ info.cityWeather.id } info={ info }/>) }

			</div>
		);
	}
}

function mapStateToProps (state) {
	// console.log ('CityList state=>', state);
	return {
		cityInfo : state.cityInfo,
		// cityWeatherInfo : state.cityWeatherInfo,
		// cityNews : state.cityNews
	};
}

CityList.propTypes = {
	cityInfo : PropTypes.array.isRequired,
};

export default connect (mapStateToProps) (CityList);
