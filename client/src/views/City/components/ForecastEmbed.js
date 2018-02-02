import React, { Component } from 'react';

export default class ForecastEmbed extends Component {
	render () {
		const {lat, lon, name} = this.props;

		return (
			// TODO need to add a mask layer to fix the mouse over bug in 3d mode
			<iframe title={ 'forecastEmbed' } className={ 'aaaa' } width={ '100%' } height={ '250px' }
			        frameBorder={ '0' }
			        src={ `https://forecast.io/embed/#lat=${lat}&lon=${lon}&color=#20a8d8&font={''}&units=us` }/>
		);
	}
}
