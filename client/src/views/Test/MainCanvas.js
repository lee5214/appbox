import React, { Component } from 'react';

class MainCanvas extends Component {
	constructor(props) {
		super(props);
		this.state={
			MemoriInnerPosition:[],
		}

		this._resizeHandler = () => {
			/* Allows CSS to determine size of canvas */
			this.canvas.width = this.canvas.clientWidth;
			this.canvas.height = this.canvas.clientHeight;

			this.clearAndDraw();
		}
	}

	componentDidMount() {
		for (let t = 360; t > 0; t -= 2) {
			let graphRadius = 200, RAD = Math.PI / 180, canvasWidthHalf = 700, canvasHeightHalf = 500 ;
			let a = (graphRadius - 70) * Math.cos (t * RAD) + canvasWidthHalf,
				e = (graphRadius - 70) * Math.sin (t * RAD) + canvasHeightHalf,
				o = (graphRadius - 74) * Math.cos (t * RAD) + canvasWidthHalf,
				i = (graphRadius - 74) * Math.sin (t * RAD) + canvasHeightHalf;
			this.state.MemoriInnerPosition.push ([ a, e, o, i ]);
		}
		console.log(this.state.MemoriInnerPosition)
		window.addEventListener('resize', this._resizeHandler);

		/* Allows CSS to determine size of canvas */
		this.canvas.width = this.canvas.clientWidth;
		this.canvas.height = this.canvas.clientHeight;

		this.clearAndDraw();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this._resizeHandler);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.secondRect !== prevProps.secondRect) {
			this.clearAndDraw();
		}
	}

	clearAndDraw() {
		const ctx = this.canvas.getContext('2d');
		if (ctx) {
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.draw(ctx);
		}
	}

	draw(ctx) {
		ctx.fillStyle = 'rgb(200, 0, 0)';
		ctx.fillRect (10, 10, 50, 50);

		if (this.props.secondRect) {
			ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
			ctx.fillRect (30, 30, 50, 50);
		}
	}

	render() {
		return (
			<canvas ref={canvas => this.canvas = canvas} />
		);
	}
}

export default MainCanvas;
