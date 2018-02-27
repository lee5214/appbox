import React, { Component } from 'react';
import * as THREE from 'three';
import Sea from './asserts/Sea';
import Sky from './asserts/Sky';
import AirPlane from './asserts/AirPlane';
import Pilot from './asserts/Pilot';
import { EnemiesHolder, Enemy } from './asserts/Enemy';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import styles from './MrThreeReacts.scss';
import { DefaultParam, normalize } from "./asserts/setting";
import fire from 'utils/fire';

const rootDB = fire.database ().ref ().child ('MrThreeReacts/');

class MrThree extends Component {
	constructor (props) {
		super (props);
		this.state = {
			//basic setup
			//cameraPosition: {x:0,y:0,z:200},//default camera pos
			gameStatus : 'waiting',
			fullScreen : false, //fs toggler
			modalIsOpen : false,
			cameraZ : 300,//200,
			cameraRotateY : 0,
			skyRotateSpeed : .0002,
			seaRotateSpeed : .0002,
			energyCharge : 1,
			seaRadius : DefaultParam.seaRadius,

			topScores : [],
			gameSaved : false,
		};
		this.prevTime = new Date ().getTime ();
		this.mousePos = {x : 0, y : 0}; //tracking mouse pos
		//this.oldTime = new Date ().getTime ();

		this.Param = DefaultParam;
		// speed
		this.worldSpeed = 1;
		this.bulletTime = false;
		this.initSpeed = .00035;
		this.baseSpeed = .00035;
		this.targetBaseSpeed = .00035;
		this.incrementSpeedByTime = .0000025;
		this.incrementSpeedByLevel = .000005;
		this.distanceForSpeedUpdate = 100;
		this.speedLastUpdate = 0;

		this.level = 1;
		this.levelLastUpdate = 0;
		this.energyBar = 100;
		this.energyCharge = 0;
		this.enemiesPool = [];
		this.distance = 0;
		this.distanceForEnnemiesSpawn = 50;
		this.enemyLastSpawn = 0;
		this.distanceForBomb = 2000;
		this.bombLastDrop = 0;
		this.bombCounter = 0;
		//this.ratioSpeedDistance = 50;

		this.distanceForLevelUpdate = this.Param.distanceForLevelUpdate;
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
		//camera.position.set (this.state.cameraPosition.x,this.state.cameraPosition.y,this.state.cameraPosition.z);

		//const controls = new THREE.OrbitControls( camera );

		// renderer
		const renderer = new THREE.WebGLRenderer ({alpha : true, antialias : true});
		//renderer.setClearColor ('red');
		renderer.setSize (this.width, this.height);
		renderer.shadowMap.enabled = true;

		this.scene = scene;
		this.scene.fog = new THREE.Fog (0xf7d9aa, 100, 950);
		//this.scene.background = //Colors.yellow;
		this.camera = camera;
		this.camera.position.set (0, 0, 200);
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
	createSea = (radius) => {
		this.sea = new Sea (radius);
		this.sea.mesh.position.y = -this.Param.seaRadius - 100;
		this.scene.add (this.sea.mesh);
	};
	createSky = (nClouds = 40) => {
		this.sky = new Sky (nClouds, 20);
		this.sky.mesh.position.y = -600;
		this.scene.add (this.sky.mesh);
	};
	createAirPlane = () => {
		this.airplane = new AirPlane ();
		this.airplane.mesh.scale.set (.25, .25, .25);
		this.airplane.mesh.position.x = this.width / 2;
		this.airplane.mesh.position.y = this.Param.planeDefaultHeight;//this.height / 2;
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
		this.createSea (this.Param.seaRadius);
		this.createSky (20, 10);
		this.createAirPlane ();
		this.createEnemies ();
	};

	componentDidMount () {
		this.init ();
		this.start ();
		//let top10 = rootDB.child ('scores').orderByValue('highestScores').limitToLast(10);
		//this.setState({topScores:[score, ...this.state.topScores ]})
		rootDB.child ('scores').limitToLast (10).on ('child_added', (snapshot) => {
			const score = snapshot.val ();
			if (score) {
				this.setState ({
					topScores : //score,
						[ score, ...this.state.topScores ],
					//messageNumber : this.state.messageNumber + 1,
				});
			}
		});
		window.addEventListener ('mousemove', this.mouseMoveEvent, false);
		window.addEventListener ('mousedown', this.mouseDownEvent, false);
		window.addEventListener ('mouseup', this.mouseUpEvent, false);
	}

	componentWillUnmount () {
		this.stop ();
		window.removeEventListener ('mousemove', this.mouseMoveEvent, false);
		window.removeEventListener ('mousedown', this.mouseDownEvent, false);
		window.removeEventListener ('mouseup', this.mouseUpEvent, false);
		this.container.removeChild (this.renderer.domElement);

		rootDB.off ();

	}

	mouseMoveEvent = (e) => {
		this.mousePos.x = -1 + (e.clientX / this.width) * 2;
		this.mousePos.y = 1 - (e.clientY / this.height) * 2;
	};
	/*mouseDownEvent = () => {
	 if(this.energyBar>0 && !this.bulletTime) {
	 this.changeWorldSpeed(0.1)//this.setState ({energyCharge : -1,bulletTime : true})
	 } else {
	 this.changeWorldSpeed(1)//this.setState ({energyCharge : 3,bulletTime : false})
	 }
	 };
	 mouseUpEvent = () => {
	 this.setState ({energyCharge : 3,bulletTime : false})
	 };*/
	touchMoverEvent = () => {};
	touchEndEvent = () => {};

	updateDistance () {
		this.distance += Math.floor (this.worldSpeed * this.deltaTime * 0.1);
		//let d = 502 * (1 - (this.distance % this.distanceForLevelUpdate) / this.distanceForLevelUpdate);
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
		let targetX = normalize (this.mousePos.x, -1, 1, -100, 100);
		let targetY = normalize (this.mousePos.y, -1, 1, this.Param.planeDefaultHeight - this.Param.planeAmpHeight, this.Param.planeDefaultHeight + this.Param.planeAmpHeight);
		this.airplane.mesh.position.y += (targetY - this.airplane.mesh.position.y) * 0.08 * this.worldSpeed;
		this.airplane.mesh.rotation.z = (targetY - this.airplane.mesh.position.y) * 0.01 * this.worldSpeed;
		!this.bulletTime ? this.airplane.mesh.rotation.x = (this.airplane.mesh.position.y - targetY) * 0.02 * this.worldSpeed : null;
		this.airplane.propeller.rotation.x += 0.3 * this.worldSpeed;
		//freeze plane on x axise
		this.airplane.mesh.position.x = 0;//targetX;
		this.camera.position.z = this.state.cameraZ + targetX;
		this.camera.rotation.y = this.state.cameraRotateY - targetX / 300;
	};
	updateEnergy = () => {
		// console.log(this.energyCharge,this.state.energyRecharge)
		//this.state.energyCharge < 0 && this.energyBar > 0 ? this.setState ({worldSpeed : 0.3}) : this.setState
		// ({worldSpeed : 1});
		//this.energyBar += this.state.energyCharge;
		this.energyBar = Math.floor (Math.max (0, this.energyBar));
		this.energyBar = Math.floor (Math.min (this.energyBar, 100));
		if (this.energyBar <= 0) {
			this.setState ({gameStatus : 'ending'});
		}
	};

	reduceEnergy = () => {
		this.energyBar -= 10;//this.ennemyValue;
		this.energyBar = Math.max (0, this.energyBar);
	};
	//bullet time
	changeWorldSpeed = (speed) => {
		this.worldSpeed = speed;
		this.bulletTime = true;
		setTimeout (
			() => {
				this.worldSpeed = 1;
				this.bulletTime = false;
			}, 1000,
		);
	};
	sendGameMessage = (msg) => {
		this.setState ({gameMessage : msg});
		setTimeout (() => this.setState ({gameMessage : ''}), 2000);
	};
	animate = () => {
		// framerate independent motion
		let currentTime = new Date ().getTime ();
		this.deltaTime = currentTime - this.prevTime;
		this.prevTime = currentTime;

		if (this.state.gameStatus === 'playing') {
			if (Math.floor (this.distance) % this.distanceForEnnemiesSpawn === 0 && Math.floor (this.distance) > this.enemyLastSpawn) {
				this.enemyLastSpawn = Math.floor (this.distance);
				this.enemiesHolder.spawnEnemies (this.level, this.enemiesPool);
			}
			if (Math.floor (this.distance) % this.distanceForLevelUpdate === 0 && Math.floor (this.distance) > this.levelLastUpdate) {
				this.levelLastUpdate = Math.floor (this.distance);
				this.level++;
				this.targetBaseSpeed = this.initSpeed + this.incrementSpeedByLevel * this.level;
				//this.worldSpeed += 0.1;//= this.initSpeed + this.incrementSpeedByLevel * this.level;
			}
			if (Math.floor (this.distance) % this.distanceForBomb === 0 && Math.floor (this.distance) > this.bombLastDrop) {
				this.bombLastDrop = Math.floor (this.distance);
				this.bombCounter++;
				//this.generateBomb();
				this.sendGameMessage ('You dropped a bomb onto other players\' face !');
				//this.worldSpeed += 0.1;//= this.initSpeed + this.incrementSpeedByLevel * this.level;
			}
			this.updatePlane ();
			this.updateDistance ();
			this.pilot.updateHairs ();
			this.updateEnergy ();
			this.baseSpeed += (this.targetBaseSpeed - this.baseSpeed) * this.deltaTime * 0.02;
			this.enemiesHolder.rotateEnemies (this.deltaTime, this.airplane, this.enemiesPool, this.worldSpeed, this.changeWorldSpeed.bind (this), this.reduceEnergy.bind (this));
			//this.worldSpeed = this.baseSpeed;
		} else if (this.state.gameStatus === 'ending') {
			if (!this.state.gameSaved) {
				const newScore = {
					displayName : this.props.currentUserInfo.local.displayName,
					score : this.distance || 0,
					time : new Date (),
				};
				rootDB.child ('scores/').push (newScore);
			}
			this.setState ({gameSaved : true});
		} else if (this.state.gameStatus === 'waiting') {
		}

		/*if (this.totle <= 10) {
		 this.enemiesHolder.spawnEnemies (4, this.enemiesPool);
		 }*/
		//this.sky.mesh.rotation.x += this.state.skyRotateSpeed * this.worldSpeed * this.deltaTime;

		this.sky.mesh.rotation.z += this.state.skyRotateSpeed * this.worldSpeed * this.deltaTime;
		this.sea.mesh.rotation.z += this.state.seaRotateSpeed * this.worldSpeed * this.deltaTime;
		this.sea.moveWaves (0.001);
		//this.airplane.propeller.rotation.x += 0.3;

		// re-draw
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

	modalToggle = () => {
		this.setState ({modalIsOpen : !this.state.modalIsOpen});
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
					<button onClick={ () => {this.setState ({gameStatus : 'playing'});} }>start</button>
					<p>Energy: { this.energyBar }</p>
					<p>Distance: { this.distance }</p>
					<p>level: { this.level }</p>
					<p>Delta: { this.deltaTime }</p>
					<p>cameraZ</p>
					<button onClick={ () => this.setState ({cameraZ : 3000}) }>3000</button>
					<button onClick={ () => this.setState ({cameraZ : 200}) }>300</button>
					<div className={ '' }>
						<p>{ this.state.message }</p>
					</div>
					{ this.state.topScores.map (item => <li
						key={ item.score }>{ item.score }{ item.displayName }</li>) }
				</div>

				<Button outline color={ this.state.fullScreen ? 'secondary' : 'primary' } size="md"
				        className={ styles.button } onClick={ this.toggleFullScreen }>
					{ this.state.fullScreen ? 'Exit Full Screen' : 'Enter Full Screen' }
				</Button>
				<Button outline color={ this.state.fullScreen ? 'secondary' : 'primary' } size="md"
				        className={ styles.button } onClick={ this.modalToggle }>
				</Button>

				<Modal isOpen={ this.state.modalIsOpen } toggle={ this.modalToggle }>
					<ModalHeader toggle={ this.toggle }>Modal title</ModalHeader>
					<ModalBody>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
						labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
						laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
						voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
						non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={ this.toggle }>Do Something</Button>{ ' ' }
						<Button color="secondary" onClick={ this.toggle }>Cancel</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

export default MrThree;

// TODO seperate mouse tracker xy with z
