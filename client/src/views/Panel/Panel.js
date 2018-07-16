import React, { Component } from 'react';
import Graph3D from './Graph3D';
import GraphCircle from './GraphCircle';
import styles from './Panel.scss';

export default class Panel extends Component {
	render () {
		return (
			<div className={ 'animated fadeIn container d-flex' }>
				<div className={ styles.slogan }>
					{/*<pre style={{color:'white'}}>
						{'while(alive){ \n'}
						{'  eat(); \n'}
						<pre style={{color:'gray'}}>
						{'  // sleep(); \n'}
						{'  // code(); \n'}
						</pre>
						{'  this.state.caffeine? code(): sleep(); \n'}
					</pre>*/}
          <span style={{color:'white'}}>
					 {'while(alive){ \n'}<br/>
					 {'  eat(); \n'}
					 <span style={{color:'gray'}}>
					 {'  // sleep(); \n'}
					 {'  // code(); \n'}
					 </span>
					 {'  this.state.caffeine? code(): sleep(); \n'}
					 </span>

				</div>
				<GraphCircle roZ={ this.props.roZ }/>
				<Graph3D/>

			</div>
		);
	}
}
