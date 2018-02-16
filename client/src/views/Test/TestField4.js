import React, { Component } from 'react';
import style from './svgCircle.scss';

class Scene extends Component {
	constructor (props) {
		super (props);
		this.state = {
			ranN : 100,
		};
	}

	render () {
		return (
			<svg className={ style.svgMainSpinner } version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
			     xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
			     viewBox="0 0 1000 1000" style={ {enableBackground : 'new 0 0 1000 1000'} } xmlSpace="preserve">
				<circle className={ style.st0 } cx="500" cy="500" r="400">
					<animateTransform attributeType="xml"
					                  attributeName="transform"
					                  type="rotate"
					                  from="0 500 500"
					                  to= '360 500 500'
					                  dur="100s"
					                  repeatCount="indefinite"/>
					{/*<animate attributeType="xml"*/}
					         {/*attributeName="stroke"*/}
					         {/*from="#5c5c5c"*/}
					         {/*to="#000000"*/}
					         {/*dur="10s"*/}
					         {/*repeatCount="indefinite"/>*/}
				</circle>
				<circle className={ style.st1 } cx="500" cy="500" r="400">
					<animateTransform attributeType="xml"
					                  attributeName="transform"
					                  type="rotate"
					                  from="0 500 500"
					                  to="360 500 500"
					                  dur="40s"
					                  repeatCount="indefinite"/>
				</circle>
				<circle className={ style.st2 } cx="500" cy="500" r="366.8" transform="rotate(0 500 500)">
					<animateTransform attributeType="xml"
					                  attributeName="transform"
					                  type="rotate"
					                  from="0 500 500"
					                  to="-360 500 500"
					                  dur="50s"
					                  repeatCount="indefinite"/>
				</circle>
				<circle className={ style.st3 } cx="500" cy="500" r="300">
					<animateTransform attributeType="xml"
					                  attributeName="transform"
					                  type="rotate"
					                  from="0 500 500"
					                  to="-360 500 500"
					                  dur="50s"
					                  repeatCount="indefinite"/>
				</circle>
				<circle className={ style.st4 } cx="500" cy="500" r="370">
					<animateTransform attributeType="xml"
					                  attributeName="transform"
					                  type="rotate"
					                  from="0 500 500"
					                  to="-360 500 500"
					                  dur="50s"
					                  repeatCount="indefinite"/>
				</circle>
			</svg>
		);
	}
}

export default Scene;
