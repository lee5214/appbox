import React, { Component } from 'react';
import * as THREE from 'three';
import Sea from './asserts/Sea';
import Sky from './asserts/Sky';
import AirPlane from './asserts/AirPlane';
import Pilot from './asserts/Pilot';
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
			worldSpeed : 1,
			skyRotateSpeed : .005,
			seaRotateSpeed : .005,
		};
		this.energyBar = 10000;
		this.energyCharge = 0;

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
		camera.position.set (0, 100, 200);

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
		this.airplane.mesh.position.y = -this.height / 2;
		this.pilot = new Pilot ();
		this.pilot.mesh.position.set (-10, 27, 0);
		this.airplane.mesh.add (this.pilot.mesh);
		this.airplane.mesh.position.set (0, 50, 0);
		this.scene.add (this.airplane.mesh);

	};
	createEnemyHolder = (nEnemy=20,ang,) => {
		createEnemy = (stepAngel) => {
			let e = new AirPlane();
			let a = stepAngel*i + Math.random(0.1,1)*10;
			let h = 650 + Math.random()*100;
			e.mesh.rotation.set(0,180,a+Math.PI/2)
			e.mesh.position.y = Math.sin(a)*h;
			e.mesh.position.x = Math.cos(a)*h;
			e.mesh.scale.set (.25, .25, .25);
			this.sky.mesh.add(e.mesh)
		}


		let stepAngle2 = Math.PI*2 / nEnemy;
		for( let i=0; i< nEnemy;i++){
			let e = new AirPlane();
			let a = stepAngle2*i  + Math.random(0.1,1)*10; //这是云的最终角度
			let h = 650 + Math.random()*100; // 这是轴的中心和云本身之间的距离

			// 三角函数！！！希望你还记得数学学过的东西 :)
			// 假如你不记得:
			// 我们简单地把极坐标转换成笛卡坐标
			e.mesh.position.y = Math.sin(a)*h;
			e.mesh.position.x = Math.cos(a)*h;

			// 根据云的位置旋转它
			e.mesh.rotation.z = a + Math.PI/2;

			e.mesh.scale.set (.25, .25, .25);

			this.mesh.add (e.mesh);
		}
	}

	init = () => {
		this.createScene ();
		this.createLights ();
		this.createSea ();
		this.createSky (20, 10);
		this.createAirPlane ();
		//this.createEnemy ();
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
		this.energyCharge = -10;
		// this.setState({energyRecharge:-10})
	};
	mouseUpEvent = () => {
		this.energyCharge = 3;
		// this.setState ({worldSpeed : 1, energyRecharge : 1});
	};
	touchMoverEvent = ()=>{}
	touchEndEvent=()=>{}


	componentWillUnmount () {
		this.stop ();
		window.removeEventListener ('mousemove', this.mouseMoveEvent, false);
		window.removeEventListener ('mousedown', this.mouseDownEvent, false);
		window.removeEventListener ('mouseup', this.mouseUpEvent, false);
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
		let targetX = this.normalize (this.state.mousePos.x, -1, 1, -100, 100);
		let targetY = this.normalize (this.state.mousePos.y, -1, 1, 25, 175);
		//this.airplane.mesh.position.y += (targetY - this.airplane.mesh.position.y) * 0.04 * this.state.worldSpeed;
		//this.airplane.mesh.position.z += (targetY - this.airplane.mesh.position.y) * 0.01 * this.state.worldSpeed;

		//this.airplane.mesh.rotation.x = (this.airplane.mesh.position.x - targetX) * 0.02 * this.state.worldSpeed;
		this.airplane.mesh.rotation.y = -(this.airplane.mesh.position.y - targetY) * 0.06 * this.state.worldSpeed;
		this.airplane.mesh.rotation.z = (targetY - this.airplane.mesh.position.y) * 0.01 * this.state.worldSpeed;

		this.airplane.propeller.rotation.x += 0.3 * this.state.worldSpeed;
		this.airplane.mesh.position.x = 0;//targetX;
		//this.camera.position.z = this.state.cameraZ + targetX;
		//this.camera.rotation.y = this.state.cameraRotateY - targetX / 300;

		this.sky.mesh.rotation.z += this.state.skyRotateSpeed * 0.001*this.state.worldSpeed;
		this.sky.mesh.rotation.x += (targetX - this.airplane.mesh.position.x) *0.0001* this.state.worldSpeed;

		this.sea.mesh.rotation.z += this.state.skyRotateSpeed * 0.001 *this.state.worldSpeed;
		this.sea.mesh.rotation.x += (targetX - this.airplane.mesh.position.x) *0.0001* this.state.worldSpeed;

	};
	updateEnergy=()=>{
		// console.log(this.energyCharge,this.state.energyRecharge)
		this.energyCharge<0&&this.energyBar>0?this.setState ({worldSpeed : 0.3}):this.setState ({worldSpeed : 1});
		this.energyBar += this.energyCharge;
		this.energyBar = Math.floor(Math.max(0,this.energyBar))
		this.energyBar = Math.floor(Math.min(this.energyBar,1000))
	}
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

		this.sea.mesh.rotation.z += this.state.seaRotateSpeed * this.state.worldSpeed;
		this.sea.moveWaves (0.001);
		//this.airplane.propeller.rotation.x += 0.3;
		this.updatePlane ();
		this.pilot.updateHairs ();
		this.updateEnergy()
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
				<div className={'position-absolute'}>
					{ this.energyBar }
				</div>
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
