import React, { Component } from 'react';
import Graph3D from './Graph3D';
import GraphCircle from './GraphCircle';

export default class Panel extends Component {
	render () {
		return (
			<div className={'animated fadeIn container d-flex'}>
				<GraphCircle roZ={ this.props.roZ }/>
				<Graph3D/>
			</div>
		);
	}
}
