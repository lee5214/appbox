import React, { Component } from 'react';
import * as THREE from 'three';
import Sea from './asserts/Sea';
import Sky from './asserts/Sky';
import AirPlane from './asserts/AirPlane';
import { Button } from 'reactstrap';
import styles from './MrThreeReacts.scss';

class MrThree extends Component {
	constructor (props) {
		super (props);
		this.state = {
			fullScreen : false,
			mousePos : {x : 0, y : 0},
			cameraZ : 200,
			cameraRotateY : 0,
		};
	}

	createScene = () => {
		this.width = this.container.clientWidth;
		this.height = this.container.clientHeight;
		const scene = new THREE.Scene ();
		const camera = new THREE.PerspectiveCamera (
			60, // fieldOfView
			this.width / this.height, // aspectRatio
			1, // nearPlane
			10000, // farPlane
		);
		camera.position.x = 0;
		camera.position.y = 100;
		camera.position.z = 200;

		// renderer
		const renderer = new THREE.WebGLRenderer ({alpha : true, antialias : true});
		//renderer.setClearColor ('#000000');
		renderer.setSize (this.width, this.height);
		renderer.shadowMap.enabled = true;

		this.scene = scene;
		this.scene.fog = new THREE.Fog (0xf7d9aa, 100, 950);
		//this.scene.background = //Colors.yellow;
		this.camera = camera;
		this.renderer = renderer;
		this.container.appendChild (this.renderer.domElement);
	};
	createLights = () => {
		let hemisphereLight = new THREE.HemisphereLight (0xaaaaaa, 0x000000, .9);
		let shadowLight = new THREE.DirectionalLight (0xffffff, .9);
		let ambientLight = new THREE.AmbientLight (0xdc8874, .5);
		shadowLight.position.set (150, 350, 350);
		shadowLight.castShadow = true;
		shadowLight.shadow.camera.left = -400;
		shadowLight.shadow.camera.right = 400;
		shadowLight.shadow.camera.top = 400;
		shadowLight.shadow.camera.bottom = -400;
		shadowLight.shadow.camera.near = 1;
		shadowLight.shadow.camera.far = 1000;
		shadowLight.shadow.mapSize.width = 2048;
		shadowLight.shadow.mapSize.height = 2048;
		this.scene.add (hemisphereLight);
		this.scene.add (shadowLight);
		this.scene.add (ambientLight);
	};
	createSea = () => {
		this.sea = new Sea ();
		this.sea.mesh.position.y = -700;
		this.scene.add (this.sea.mesh);
	};
	createSky = (cloudNumb) => {
		this.sky = new Sky (cloudNumb);
		this.sky.mesh.position.y = -600;
		this.scene.add (this.sky.mesh);
	};
	createAirPlane = () => {
		this.airplane = new AirPlane ();
		this.airplane.mesh.scale.set (.25, .25, .25);
		this.airplane.mesh.position.x = this.width / 2;
		this.airplane.mesh.position.y = -this.height / 2;
		this.scene.add (this.airplane.mesh);
	};
	init = () => {
		this.createScene ();
		this.createLights ();
		this.createSea ();
		this.createSky (40);
		this.createAirPlane ();
	};

	componentDidMount () {
		this.init ();
		this.start ();
		document.addEventListener ('mousemove', this.handleMouseMove, false);


	}

	handleMouseMove = (e) => {
		this.setState ({mousePos : {x : -1 + (e.clientX / this.width) * 2, y : 1 - (e.clientY / this.height) * 2}});
	};

	componentWillUnmount () {
		this.stop ();
		this.container.removeChild (this.renderer.domElement);
	}

	start = () => {
		if (!this.frameId) {
			this.frameId = requestAnimationFrame (this.animate);
		}
	};
	stop = () => {
		cancelAnimationFrame (this.frameId);
	};
	updatePlane = () => {
		var targetX = this.normalize (this.state.mousePos.x, -1, 1, -100, 100);
		var targetY = this.normalize (this.state.mousePos.y, -1, 1, 25, 175);

		this.airplane.mesh.position.y += (targetY - this.airplane.mesh.position.y) * 0.1;
		this.airplane.mesh.rotation.z = (targetY - this.airplane.mesh.position.y) * 0.0128;
		this.airplane.mesh.rotation.x = (this.airplane.mesh.position.y - targetY) * 0.0064;
		this.airplane.propeller.rotation.x += 0.3;

		this.airplane.mesh.position.x = 0;//targetX;
		this.camera.position.z = this.state.cameraZ + targetX;
		this.camera.rotation.y = this.state.cameraRotateY - targetX / 300;
	};
	normalize = (v, vmin, vmax, tmin, tmax) => {
		var nv = Math.max (Math.min (v, vmax), vmin);
		var dv = vmax - vmin;
		var pc = (nv - vmin) / dv;
		var dt = tmax - tmin;
		var tv = tmin + (pc * dt);
		return tv;
	};
	animate = () => {
		this.sea.mesh.rotation.z += .005;
		this.sea.moveWaves ();
		this.sea.mesh.rotation.z += .005;
		this.sky.mesh.rotation.z += .01;
		//this.airplane.propeller.rotation.x += 0.3;
		this.updatePlane ();
		this.airplane.propeller.rotation.x += 0.3;
		this.airplane.pilot.updateHairs ();
		//this.camera.position.z = 20 * Math.sin( THREE.Math.degToRad( this.theta ) );
		this.renderScene ();
		this.frameId = window.requestAnimationFrame (this.animate);
	};

	renderScene () {
		this.renderer.render (this.scene, this.camera);
	}

	toggleFullScreen = () => {
		document.body.classList.toggle ('sidebar-hidden');
		document.body.classList.toggle ('aside-menu-hidden');
		this.setState ({fullScreen : !this.state.fullScreen});
	};

	render () {
		let w = window.innerWidth * .5, h = window.innerWidth * .5;
		return (
			<div style={ {
				width : `${this.state.fullScreen ? '100vw' : '100%'}`,
				height : `${this.state.fullScreen ? '100vh' : '100%'}`,
			} }
			     className={ styles.GameContainer }

			     ref={ (mount) => { this.container = mount; } }
			>
				<Button outline color={ this.state.fullScreen ? 'secondary' : 'primary' } size="md"
				        className={ styles.button } onClick={ this.toggleFullScreen }>
					{ this.state.fullScreen ? 'Exit Full Screen' : 'Enter Full Screen' }
				</Button>
				{ /*<form onSubmit={ e => this.onSubmit (e) }>
				 <lable>
				 <input type="text" ref={ (input) => this.input = input }/>
				 <button type='submit' value="submit">change</button>
				 </lable>
				 </form>*/ }
			</div>
		);
	}
}

export default MrThree;

// TODO seperate mouse tracker xy with z
