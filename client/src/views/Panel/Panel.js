import React, { Component } from 'react';
import Graph3D from './Graph3D';
import GraphCircle from './GraphCircle';
import styles from './Panel.scss';

export default class Panel extends Component {
	render () {
		return (
			<div className={ 'animated fadeIn container d-flex' }>
				<div className={ styles.slogan }>

					{/*<h2>Caffeine ? Code : Bug</h2>*/}
					<pre style={{color:'red'}}>
						{'while(alive){ \n'}
						{'  eat(); \n'}
						{'  // sleep(); \n'}
						{'  // code(); \n'}
						{'  this.state.caffeine? code(): sleep(); \n'}
					</pre>
				</div>
				<GraphCircle roZ={ this.props.roZ }/>
				<Graph3D/>

			</div>
		);
	}
}
