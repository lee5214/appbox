import React, { Component } from 'react';
import * as THREE from 'three';
import Sea from './asserts/Sea';
import Sky from './asserts/Sky';
import AirPlane from './asserts/AirPlane';
import Pilot from './asserts/Pilot';
import { EnemiesHolder, Enemy } from './asserts/Enemy';
import { Button } from 'reactstrap';
import styles from './MrThreeReacts.scss';
import { Param } from "./asserts/setting";

class MrThree extends Component {
	constructor (props) {
		super (props);
		this.state = {
			//basic setup
			worldSpeed : 1,
			cameraPosition: {x:0,y:100,z:200},//default camera pos
			fullScreen : false, //fs toggler
			mousePos : {x : 0, y : 0}, //tracking mouse pos
			cameraZ : 3000,//200,
			cameraRotateY : 0,
			skyRotateSpeed : .005,
			seaRotateSpeed : .005,
			energyCharge:1,
			bulletTime : false,
		};
		this.deltaTime = 0;
		this.newTime = new Date ().getTime ();
		this.oldTime = new Date ().getTime ();
		this.energyBar = 10000;
		this.energyCharge = 0;
		this.enemiesPool = [];
		this.distance = 0;
		this.distanceForEnnemiesSpawn = 50;
		this.enemyLastSpawn = 0;
		this.speed = 1;//Param.speed;
		this.ratioSpeedDistance = 50;//Param.speed;
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
		camera.position.set (this.state.cameraPosition.x,this.state.cameraPosition.y,this.state.cameraPosition.z);

		//const controls = new THREE.OrbitControls( camera );

		// renderer
		const renderer = new THREE.WebGLRenderer ({alpha : true, antialias : true});
		//renderer.setClearColor ('#000000');
		renderer.setSize (this.width, this.height);
		renderer.shadowMap.enabled = true;

		this.scene = scene;
		//this.scene.fog = new THREE.Fog (0xf7d9aa, 100, 950);
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
	createSky = (nClouds, nEnemy) => {
		this.sky = new Sky (40, 20);
		this.sky.mesh.position.y = -600;
		this.scene.add (this.sky.mesh);
	};
	createAirPlane = () => {
		this.airplane = new AirPlane ();
		this.airplane.mesh.scale.set (.25, .25, .25);
		this.airplane.mesh.position.x = this.width / 2;
		this.airplane.mesh.position.y = this.height / 2;
		this.pilot = new Pilot ();
		this.pilot.mesh.position.set (-10, 27, 0);
		this.airplane.mesh.add (this.pilot.mesh);
		this.scene.add (this.airplane.mesh);

	};
	createEnemies = () => {
		for (let i = 0; i < 10; i++) {
			let enemy = new Enemy ();
			this.enemiesPool.push (enemy);
		}
		this.enemiesHolder = new EnemiesHolder ();
		this.scene.add (this.enemiesHolder.mesh);
	};

	init = () => {
		this.createScene ();
		this.createLights ();
		this.createSea ();
		this.createSky (20, 10);
		this.createAirPlane ();
		this.createEnemies ();
		let enemy = new Enemy ();
		this.scene.add(enemy.mesh);
	};

	componentDidMount () {
		this.init ();
		this.start ();
		window.addEventListener ('mousemove', this.mouseMoveEvent, false);
		window.addEventListener ('mousedown', this.mouseDownEvent, false);
		window.addEventListener ('mouseup', this.mouseUpEvent, false);
	}

	mouseMoveEvent = (e) => {
		this.setState ({mousePos : {x : -1 + (e.clientX / this.width) * 2, y : 1 - (e.clientY / this.height) * 2}});
	};
	mouseDownEvent = () => {
		if(this.energyBar>0) {
			this.setState ({energyCharge : -1,bulletTime : true})
		} else {
			this.setState ({energyCharge : 3,bulletTime : false})
		}
	};
	mouseUpEvent = () => {
		this.setState ({energyCharge : 3,bulletTime : false})
	};
	touchMoverEvent = () => {};
	touchEndEvent = () => {};


	componentWillUnmount () {
		this.stop ();
		window.removeEventListener ('mousemove', this.mouseMoveEvent, false);
		window.removeEventListener ('mousedown', this.mouseDownEvent, false);
		window.removeEventListener ('mouseup', this.mouseUpEvent, false);
		this.container.removeChild (this.renderer.domElement);

	}

	updateDistance () {
		this.distance += Math.floor(this.speed * this.deltaTime * this.ratioSpeedDistance*0.001);
		let d = 502 * (1 - (this.distance % this.distanceForLevelUpdate) / this.distanceForLevelUpdate);

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
		let targetX = this.normalize (this.state.mousePos.x, -1, 1, -100, 100);
		let targetY = this.normalize (this.state.mousePos.y, -1, 1, 25, 175);
		this.airplane.mesh.position.y += (targetY - this.airplane.mesh.position.y) * 0.04 * this.state.worldSpeed;
		this.airplane.mesh.rotation.z = (targetY - this.airplane.mesh.position.y) * 0.01 * this.state.worldSpeed;

		!this.state.bulletTime ? this.airplane.mesh.rotation.x = (this.airplane.mesh.position.y - targetY) * 0.02 * this.state.worldSpeed : null;
		this.airplane.propeller.rotation.x += 0.3 * this.state.worldSpeed;
		this.airplane.mesh.position.x = 0;//targetX;
		this.camera.position.z = this.state.cameraZ + targetX;
		this.camera.rotation.y = this.state.cameraRotateY - targetX / 300;
	};
	updateEnergy = () => {
		// console.log(this.energyCharge,this.state.energyRecharge)
		this.state.energyCharge < 0 && this.energyBar > 0 ? this.setState ({worldSpeed : 0.3}) : this.setState ({worldSpeed : 1});
		this.energyBar += this.state.energyCharge;
		this.energyBar = Math.floor (Math.max (0, this.energyBar));
		this.energyBar = Math.floor (Math.min (this.energyBar, 1000));
	};
	normalize = (v, vmin, vmax, tmin, tmax) => {
		let nv = Math.max (Math.min (v, vmax), vmin);
		let dv = vmax - vmin;
		let pc = (nv - vmin) / dv;
		let dt = tmax - tmin;
		let tv = tmin + (pc * dt);
		//console.log(v,vmin,vmax,tmin,tmax,dt,tv)
		return tv;
	};
	animate = () => {
		this.newTime = new Date ().getTime ();
		this.deltaTime = this.newTime - this.oldTime;
		this.oldTime = this.newTime;

		if (this.totle <= 10) {
			this.enemiesHolder.spawnEnemies (2, this.enemiesPool);
		}

		if (Math.floor (this.distance) % this.distanceForEnnemiesSpawn === 0 && Math.floor (this.distance) > this.enemyLastSpawn) {
			this.enemyLastSpawn = Math.floor (this.distance);
			this.enemiesHolder.spawnEnemies ();
		}

		this.sky.mesh.rotation.z += this.state.skyRotateSpeed * this.state.worldSpeed;
		this.sea.mesh.rotation.z += this.state.seaRotateSpeed * this.state.worldSpeed;
		this.sea.moveWaves (0.001);
		//this.airplane.propeller.rotation.x += 0.3;
		this.updatePlane ();
		this.updateDistance ();
		this.pilot.updateHairs ();
		this.updateEnergy ();
		//setTimeout( ()=> {
		this.renderScene ();
		this.frameId = window.requestAnimationFrame (this.animate);
		//}, 1000 / 30 );
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
		//let w = window.innerWidth * .5, h = window.innerWidth * .5;
		return (
			<div>
				<div style={ {
					width : `${this.state.fullScreen ? '100vw' : '100%'}`,
					height : `${this.state.fullScreen ? '100vh' : '100%'}`,
				} }
				     className={ styles.GameContainer }
				     ref={ (mount) => { this.container = mount; } }
				>
				</div>
				<div className={ 'position-absolute' }>
					<p>Energy: { this.energyBar }</p>
					<p>Distance: { this.distance }</p>
					<p>Delta: { this.deltaTime}</p>
				</div>
				<Button outline color={ this.state.fullScreen ? 'secondary' : 'primary' } size="md"
				        className={ styles.button } onClick={ this.toggleFullScreen }>
					{ this.state.fullScreen ? 'Exit Full Screen' : 'Enter Full Screen' }
				</Button>
			</div>
		);
	}
}

export default MrThree;

// TODO seperate mouse tracker xy with z
