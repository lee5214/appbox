import React, { Component } from 'react';

export default class DK extends Component {
	render () {
		const {lat, lon, name} = this.props;

		return (
			<iframe className={ 'aaaa' } width={ '100%' } height={ '250px' } frameBorder={ '0' }
				src={ `http://forecast.io/embed/#lat=${lat}&lon=${lon}&color=#20a8d8&font={''}&units=us` }/>
		);
	}
}
