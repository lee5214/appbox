import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'weather-icons/css/weather-icons.css';
import CityCurrent from './CityCurrent';

class CityList extends Component {

	render () {
		return (
			<div>
				{ this.props.cityInfo.map (info => <CityCurrent key={info.id} info={ info }/>) }
			</div>
		);
	}
}

function mapStateToProps (state) {
	console.log ('CityList state=>', state);
	return {
		cityInfo : state.cityInfo,
	};
}

CityList.propTypes = {
	cityInfo : PropTypes.array.isRequired,
};

export default connect (mapStateToProps) (CityList);
