import React, { Component } from 'react';
import style from './svgCircle.scss';
import TweenMax from 'gsap';

class GraphCircle extends Component {
	constructor (props) {
		super (props);
		this.state = {
			ranN : 100,
			colorDefault : '#3a3a3a',
			roX : 100,
			roY : 0,
			roZ : 200,
		};
	}

	componentDidMount = () => {
		//startAnimation ('#aaa');
		TweenMax.to ('.svgCircle__st2', 0.5, {
			boxShadow : "0px 0px 10px 10px rgb(0, 204, 0)",
		});
	};

	componentWillReceiveProps (nextProps) {
		//nextProps.roZ?this.setState({roZ:nextProps.roZ}):null;
	}

	onMouseMove = (e) => {
		// let mX = e.clientX, mY = e.clientY, mZ = e.clientZ;
		// let maxRotateX = 10;
		// let maxRotateY = 10;
		// let view_option = 3;
		// let {left, right, top, bottom, height, width} = this.mainSvg.getBoundingClientRect ();
		// let centerX = width / 2,
		// 	centerY = height / 2,
		// 	curRelPosX = mX - left,
		// 	curRelPosY = mY - top,
		// 	percentX = (curRelPosX - centerX) / centerX,
		// 	percentY = (curRelPosY - centerY) / centerY;
		// let roX = -percentY * maxRotateX, roY = percentX * maxRotateY;
		// if (roX !== this.state.roX || roY !== this.state.roY) {
		// 	this.setState ({roX, roY});
		// }
		//this.setState({roZ:this.props.roZ})
	};

	render () {
		let svgAnimation = {
			transform : 'rotateZ(' + this.props.roZ + 'deg)',
		};
		return (
			<div className={style.svgContainer}>
				<div className={style.backgroundContainer}>
				</div>
				<svg className={ style.svgMainSpinner } version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
				     xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				     viewBox="0 0 1000 1000" style={ {enableBackground : 'new 0 0 1000 1000'} } xmlSpace="preserve">
					<canvas width={500} height={500}/>
					<text className={ style.angNum } x="490" y="50"
					      transform="rotate(30 500,500)">{ this.props.roZ }</text>
					<text className={ style.angNum } x="490" y="50"
					      transform="rotate(-90 500,500)">AAA</text>
					<text className={ style.angNum } x="900" y="900"
					      transform="rotate(0 500,500)">
						App Box
					</text>

					<circle className={ style.st0 } cx="500" cy="500" r="480"/>
					<circle style={ {stroke : this.state.colorDefault} } className={ style.st1 } cx="500" cy="500"
					        r="400">
						<animateTransform attributeType="xml"
						                  attributeName="transform"
						                  type="rotate"
						                  from="0 500 500"
						                  to='360 500 500'
						                  dur="100s"
						                  repeatCount="indefinite"/>
					</circle>
					<circle className={ style.st2 } cx="500" cy="500" r="370">
						<animateTransform attributeType="xml"
						                  attributeName="transform"
						                  type="rotate"
						                  from="0 500 500"
						                  to="-360 500 500"
						                  dur="50s"
						                  repeatCount="indefinite"/>
					</circle>
					<circle className={ style.st3 } cx="500" cy="500" r="350">
						<animateTransform attributeType="xml"
						                  attributeName="transform"
						                  type="rotate"
						                  from="0 500 500"
						                  to="-360 500 500"
						                  dur="50s"
						                  repeatCount="indefinite"/>
					</circle>
					<g className={ style.graphInsideArrow } style={ svgAnimation }>>
						{/* crosses */}
						<polyline className={ style.p0 } points="300,960,500,500,700,960"/>
						<polyline  className={ style.p1 } transform="rotate(180 500,500)" points="300,960,500,500,700,960" />
						{/* dots */}
						<polyline className={style.dot_d1} points="500,0,500,20" transform="rotate(23.5 500,500)" />
						<polyline className={style.dot_d1} points="500,0,500,20" transform="rotate(-23.5 500,500)" />
						<polyline  className={ style.dot_d1 } points="500,960,500,940"/>
						</g>
				</svg>
				<svg className={ style.g1 } version="1.1" xmlns="http://www.w3.org/2000/svg"
				     xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				     viewBox="0 0 1000 1000" style={ {enableBackground : 'new 0 0 1000 1000'} } xmlSpace="preserve">

					<g>
						<path className="st0" d="M0,0v34.7h8.8v34.7h1.6c2.2-5.5,4.8-10.8,7.8-15.7h-6.2V40.3h13.3v3.1c2.9-3.7,6.1-7.3,9.6-10.6V16.7h16.3V20
		c5.7-3.6,11.8-6.7,18.1-9.1V6.9H20.7V0H0z M14.5,4.3c0,0.9-0.8,1.7-1.7,1.7C11.8,6,11,5.3,11,4.3c0-1,0.8-1.7,1.7-1.7
		C13.7,2.6,14.5,3.4,14.5,4.3z M19.3,4.3c0,0.9-0.8,1.7-1.7,1.7c-0.9,0-1.7-0.8-1.7-1.7c0-1,0.8-1.7,1.7-1.7
		C18.6,2.6,19.3,3.4,19.3,4.3z M6.3,22.5C6.3,16.7,11,12,16.8,12c5.8,0,10.5,4.7,10.5,10.5c0,5.8-4.7,10.5-10.5,10.5
		C11,33.1,6.3,28.3,6.3,22.5z M6.2,4.3c0-1,0.8-1.7,1.7-1.7c0.9,0,1.7,0.8,1.7,1.7C9.6,5.3,8.8,6,7.9,6C6.9,6,6.2,5.3,6.2,4.3z
		M1.3,4.3c0-1,0.8-1.7,1.7-1.7c0.9,0,1.7,0.8,1.7,1.7C4.7,5.3,3.9,6,3,6C2.1,6,1.3,5.3,1.3,4.3z"/>
						<polygon className="st0" points="26,0.6 26,3 74.7,3 74.7,9.9 79.2,9.9 79.2,0.6 	"/>
						<path className="st0" d="M8.3,22.5c0,4.6,3.8,8.4,8.4,8.4c4.6,0,8.4-3.8,8.4-8.4c0-4.6-3.8-8.4-8.4-8.4C12,14.1,8.3,17.9,8.3,22.5z
		M9.4,22.5c0-4,3.2-7.2,7.3-7.2c4,0,7.2,3.2,7.2,7.2s-3.2,7.3-7.2,7.3C12.7,29.8,9.4,26.6,9.4,22.5z"/>

						<polygon className="st0" points="0.3,38.8 0.3,79.5 13.3,79.5 13.3,73.5 4.4,73.5 4.4,38.8 	"/>
						<path className="st0" d="M19.4,22.5c0-1.5-1.2-2.7-2.7-2.7c-1.5,0-2.7,1.2-2.7,2.7c0,1.5,1.2,2.7,2.7,2.7
		C18.2,25.3,19.4,24.1,19.4,22.5z"/>
					</g>
				</svg>
				<svg className={ style.g2 } version="1.1" xmlns="http://www.w3.org/2000/svg"
				     xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				     viewBox="0 0 80 80" style={ {enableBackground : 'new 0 0 1000 1000'} } xmlSpace="preserve">

					<g>
						<path className="st0" d="M79.2,79.5V44.8h-8.8V10.1h-1.6c-2.2,5.5-4.8,10.8-7.8,15.7h6.2v13.3H53.8v-3.1c-2.9,3.7-6.1,7.3-9.6,10.6
		v16.2H27.9v-3.3c-5.7,3.6-11.8,6.7-18.1,9.1v3.9h48.7v6.9H79.2z M64.7,75.2c0-0.9,0.8-1.7,1.7-1.7c0.9,0,1.7,0.8,1.7,1.7
		c0,1-0.8,1.7-1.7,1.7C65.5,76.9,64.7,76.2,64.7,75.2z M59.8,75.2c0-0.9,0.8-1.7,1.7-1.7c0.9,0,1.7,0.8,1.7,1.7c0,1-0.8,1.7-1.7,1.7
		C60.6,76.9,59.8,76.2,59.8,75.2z M72.9,57c0,5.8-4.7,10.5-10.5,10.5c-5.8,0-10.5-4.7-10.5-10.5c0-5.8,4.7-10.5,10.5-10.5
		C68.2,46.4,72.9,51.2,72.9,57z M73,75.2c0,1-0.8,1.7-1.7,1.7c-0.9,0-1.7-0.8-1.7-1.7c0-0.9,0.8-1.7,1.7-1.7
		C72.2,73.5,73,74.3,73,75.2z M77.9,75.2c0,1-0.8,1.7-1.7,1.7c-0.9,0-1.7-0.8-1.7-1.7c0-0.9,0.8-1.7,1.7-1.7
		C77.1,73.5,77.9,74.3,77.9,75.2z"/>
						<polygon className="st0" points="53.2,78.9 53.2,76.6 4.5,76.6 4.5,69.6 0,69.6 0,78.9 	"/>
						<path className="st0" d="M70.9,57c0-4.6-3.8-8.4-8.4-8.4c-4.6,0-8.4,3.8-8.4,8.4c0,4.6,3.8,8.4,8.4,8.4C67.1,65.4,70.9,61.6,70.9,57z
		 M69.8,57c0,4-3.2,7.2-7.3,7.2c-4,0-7.2-3.2-7.2-7.2c0-4,3.2-7.3,7.2-7.3C66.5,49.7,69.8,53,69.8,57z"/>
						<rect x="30" y="48.7" className="st0" width="12" height="12"/>
						<polygon className="st0" points="78.9,40.7 78.9,0 65.9,0 65.9,6 74.7,6 74.7,40.7 	"/>
						<path className="st0"
						      d="M59.8,57c0,1.5,1.2,2.7,2.7,2.7c1.5,0,2.7-1.2,2.7-2.7c0-1.5-1.2-2.7-2.7-2.7C61,54.2,59.8,55.5,59.8,57z"/>
					</g>
				</svg>
			</div>
		);
	}
}

export default GraphCircle;
