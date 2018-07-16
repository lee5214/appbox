import React, { Component } from 'react';
import * as THREE from 'three';
import Sea from './assets/Sea';
import Sky from './assets/Sky';
import AirPlane from './assets/AirPlane';
import Pilot from './assets/Pilot';
import { EnemiesHolder, Enemy } from './assets/Enemy';
import GameMenu from './assets/GameMenu';
import styles from './MrThreeReacts.scss';
import { DefaultParam, normalize } from "./assets/setting";
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
			topScores : [],
			gameSaved : false,
			gameMessage : '',
			bombOwner : '',
		};
		this.prevTime = new Date ().getTime ();
		this.mousePos = {x : 0, y : 0}; //tracking mouse pos
		//this.oldTime = new Date ().getTime ();
		this.Param = {
			speed : 0,
			initSpeed : .00035,
			baseSpeed : .00035,
			targetBaseSpeed : .00035,
			incrementSpeedByTime : .0000025,
			incrementSpeedByLevel : .000005,
			distanceForSpeedUpdate : 100,
			speedLastUpdate : 0,

			distance : 0,
			ratioSpeedDistance : 50,
			energy : 20,
			maxEnergy : 100,
			ratioSpeedEnergy : 3,

			level : 1,
			levelLastUpdate : 0,
			distanceForLevelUpdate : 1000,

			planeDefaultHeight : 100,
			planeAmpHeight : 80,
			planeAmpWidth : 75,
			planeMoveSensivity : 0.005,
			planeRotXSensivity : 0.0008,
			planeRotZSensivity : 0.0004,
			planeFallSpeed : .001,
			planeMinSpeed : 1.2,
			planeMaxSpeed : 1.6,
			planeSpeed : 0,
			planeCollisionDisplacementX : 0,
			planeCollisionSpeedX : 0,

			planeCollisionDisplacementY : 0,
			planeCollisionSpeedY : 0,

			seaRadius : 600,
			seaLength : 800,
			//seaRotationSpeed:0.006,
			wavesMinAmp : 5,
			wavesMaxAmp : 20,
			wavesMinSpeed : 0.001,
			wavesMaxSpeed : 0.003,

			cameraFarPos : 500,
			cameraNearPos : 150,
			cameraSensivity : 0.002,

			coinDistanceTolerance : 15,
			coinValue : 3,
			coinsSpeed : .5,
			coinLastSpawn : 0,
			distanceForCoinsSpawn : 100,

			enemyDistanceTolerance : 10,
			enemyValue : 10,
			enemiesSpeed : .6,
			enemyLastSpawn : 0,
			distanceForEnemiesSpawn : 100,
			enemyBulletTime : 30,

			worldSpeed : 1,
			bulletTime : false,
			status : "playing",
			distanceForEnnemiesSpawn : 50,
			distanceForBomb : 2000,
			bombLastDrop : 0,
			bombCounter : 0,
		};
		// speed
		this.enemiesPool = [];
		//this.ratioSpeedDistance = 50;
	}

	componentDidMount () {
		this.init ();
		this.start ();

		rootDB.child ('scores').orderByChild ('score').limitToLast (5).on ('child_added', (snapshot) => {
			const score = snapshot.val ();
			if (score) {
				this.setState ({
					topScores :
						[ score, ...this.state.topScores ],
				});
			}
		});
		/*this.setState ({
		 topScores :
		 [ {score : 999, displayName : 'cong li'}, {score : 9999, displayName : 'guest'} ],
		 });*/
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
		//this.scene.fog = new THREE.Fog (0xf7d9aa, 100, 950);

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
		this.resetGame ();
	};


	mouseMoveEvent = (e) => {
		this.mousePos.x = -1 + (e.clientX / this.width) * 2;
		this.mousePos.y = 1 - (e.clientY / this.height) * 2;
	};
	/*mouseDownEvent = () => {
	 if(this.energy>0 && !this.Param.bulletTime) {
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
		this.Param.distance += Math.floor (this.Param.worldSpeed * this.deltaTime * 0.1);
		//let d = 502 * (1 - (this.Param.distance % this.Param.distanceForLevelUpdate) /
		// this.Param.distanceForLevelUpdate);
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
		this.airplane.mesh.position.y += (targetY - this.airplane.mesh.position.y) * 0.08 * this.Param.worldSpeed;
		this.airplane.mesh.rotation.z = (targetY - this.airplane.mesh.position.y) * 0.01 * this.Param.worldSpeed;
		!this.Param.bulletTime ? this.airplane.mesh.rotation.x = (this.airplane.mesh.position.y - targetY) * 0.02 * this.Param.worldSpeed : null;
		this.airplane.propeller.rotation.x += 0.3 * this.Param.worldSpeed;
		//freeze plane on x axise
		this.airplane.mesh.position.x = 0;//targetX;
		this.camera.position.z = this.state.cameraZ + targetX;
		this.camera.rotation.y = this.state.cameraRotateY - targetX / 300;
	};
	updateEnergy = () => {
		this.Param.energy = Math.floor (Math.max (0, this.Param.energy));
		this.Param.energy = Math.floor (Math.min (this.Param.energy, this.Param.maxEnergy));
		if (this.Param.energy <= 0) {
			this.setState ({gameStatus : 'gameOver'});
		}
	};

	reduceEnergy = () => {
		this.Param.energy -= 10;//this.ennemyValue;
		this.Param.energy = Math.max (0, this.Param.energy);
	};
	//bullet time
	changeWorldSpeed = (speed) => {
		this.Param.worldSpeed = speed;
		this.Param.bulletTime = true;
		setTimeout (
			() => {
				this.Param.worldSpeed = 1;
				this.Param.bulletTime = false;
			}, 1000,
		);
	};
	sendGameMessage = (msg, time = 1000) => {
		this.setState ({gameMessage : msg});
		//setTimeout (() => this.setState ({gameMessage : ''}), time);
	};
	animate = () => {
		// framerate independent motion
		let currentTime = new Date ().getTime ();
		this.deltaTime = currentTime - this.prevTime;
		this.prevTime = currentTime;

		if (this.state.gameStatus === 'playing') {
      this.setState ({gameSaved : false})
			if (Math.floor (this.Param.distance) % this.Param.distanceForEnnemiesSpawn === 0 && Math.floor (this.Param.distance) > this.Param.enemyLastSpawn) {
				this.Param.enemyLastSpawn = Math.floor (this.Param.distance);
				this.enemiesHolder.spawnEnemies (this.Param.level, this.enemiesPool);
			}
			if (Math.floor (this.Param.distance) % this.Param.distanceForLevelUpdate === 0 && Math.floor (this.Param.distance) > this.Param.levelLastUpdate) {
				this.Param.levelLastUpdate = Math.floor (this.Param.distance);
				this.Param.level++;
				this.Param.targetBaseSpeed = this.Param.initSpeed + this.Param.incrementSpeedByLevel * this.Param.level;
				//this.Param.worldSpeed += 0.1;//= this.Param.initSpeed + this.Param.incrementSpeedByLevel *
				// this.Param.level;
			}
			if (Math.floor (this.Param.distance) % this.Param.distanceForBomb === 0 && Math.floor (this.Param.distance) > this.Param.bombLastDrop) {
				this.Param.bombLastDrop = Math.floor (this.Param.distance);
				this.Param.bombCounter++;
				//this.generateBomb();
				this.sendGameMessage ('You dropped a bomb onto other players\' face !', 2000);
				//this.Param.worldSpeed += 0.1;//= this.Param.initSpeed + this.Param.incrementSpeedByLevel *
				// this.Param.level;
			}
			this.updateDistance ();
			this.pilot.updateHairs ();
			this.updateEnergy ();
			this.Param.baseSpeed += (this.Param.targetBaseSpeed - this.Param.baseSpeed) * this.deltaTime * 0.02;
			//this.Param.worldSpeed = this.Param.baseSpeed;
		} else if (this.state.gameStatus === 'gameOver') {
			if (!this.state.gameSaved) {
				const newScore = {
					displayName : this.props.currentUserInfo.local.displayName,
					score : this.Param.distance || 0,
					time : new Date (),
				};
				rootDB.child ('scores/').push (newScore);
			}
			this.setState ({gameSaved : true, gameStatus : 'waiting'});

			/*this.sendGameMessage ('You Lost!', 2000);*/
		} else if (this.state.gameStatus === 'waiting') {
		}

		/*if (this.totle <= 10) {
		 this.enemiesHolder.spawnEnemies (4, this.enemiesPool);
		 }*/
		//this.sky.mesh.rotation.x += this.state.skyRotateSpeed * this.Param.worldSpeed * this.deltaTime;
		this.updatePlane ();

		this.enemiesHolder.rotateEnemies (this.deltaTime, this.airplane, this.enemiesPool, this.Param.worldSpeed, this.changeWorldSpeed.bind (this), this.reduceEnergy.bind (this));

		this.sky.mesh.rotation.z += this.state.skyRotateSpeed * this.Param.worldSpeed * this.deltaTime;
		this.sea.mesh.rotation.z += this.state.seaRotateSpeed * this.Param.worldSpeed * this.deltaTime;
		this.sea.moveWaves (0.001);
		//this.airplane.propeller.rotation.x += 0.3;

		// re-draw
		this.renderScene ();
		this.frameId = window.requestAnimationFrame (this.animate);
	};

	renderScene () {
		this.renderer.render (this.scene, this.camera);
	}

	resetGame = (gameStatus) => {
		// necessory. create a new obj with default setting
		//const paramHolder =
		this.Param = Object.assign ({}, DefaultParam);
		this.setState ({gameStatus});
	};
	changeGameStatus = (gameStatus) => {
		// necessory. create a new obj with default setting
		//const paramHolder =
		if (gameStatus === 'playing') {
			this.Param = Object.assign ({}, DefaultParam);
		}

		this.setState ({gameStatus});
	};

	setCameraZ = (cameraZ) => {
		this.setState ({cameraZ});
	};

	render = () => {
		//let w = window.innerWidth * .5, h = window.innerWidth * .5;
		return (
			<div className={ 'animated fadeIn container pt-4' }>
				<div style={ {
					width : `${this.state.fullScreen ? '100vw' : '100%'}`,
					height : `${this.state.fullScreen ? '100vh' : '100%'}`,
				} }
				     className={ styles.GameContainer }
				     ref={ (mount) => { this.container = mount; } }
				>
				</div>
				<div className={ 'position-absolute' }>
					<p>Energy: { this.Param.energy || null }</p>
					<p>Score: { this.Param.distance || 0 }</p>
					<p>level: { this.Param.level || null }</p>
					<p>FPS: { Math.floor (1000 / this.deltaTime) }</p>
					{ /*{this.state.bombOwner&&this.state.gameStatus==='gameOver'?<h1>You got bombed by {this.state.bombOwner}</h1>:null}*/ }


				</div>
				<h1 className={'position-relative text-center'}>{ this.state.gameMessage || null }</h1>

				{ /*<div className={ 'position-absolute' }>
				 <button onClick={ () => {
				 this.resetGame ();
				 this.setState ({gameStatus : 'playing'});
				 } }>playing
				 </button>
				 <p>Energy: { this.Param.energy }</p>
				 <p>Distance: { this.Param.distance }</p>
				 <p>level: { this.Param.level }</p>
				 <p>Delta: { Math.floor(1000/this.deltaTime) }</p>
				 <p>cameraZ</p>
				 <button onClick={ () => this.setState ({cameraZ : 3000}) }>3000</button>
				 <button onClick={ () => this.setState ({cameraZ : 200}) }>300</button>
				 <div className={ '' }>
				 <p>{ this.state.gameMessage }</p>
				 </div>
				 { this.state.topScores.map (item =>
				 <li key={ item.score }>{ item.score } - { item.displayName }</li>,
				 ) }
				 </div>
				 <Row className={ styles.buttonGroup }>
				 <Col>
				 <Button size="md"
				 className={ styles.button } onClick={ this.toggleFullScreen }>
				 { this.state.fullScreen ? 'Exit Full Screen' : 'Enter Full Screen' }
				 </Button>
				 <Button outline color={ this.state.fullScreen ? 'secondary' : 'primary' } size="md"
				 className={ styles.button }
				 onClick={ this.modalToggle }
				 >About
				 </Button>
				 <Button outline color={ this.state.fullScreen ? 'secondary' : 'primary' } size="md"
				 className={ styles.button }
				 onClick={()=>{this.resetGame ();this.setState ({gameStatus : 'playing'});} }
				 >
				 { this.state.gameStatus === 'waiting' ? 'Start' : ('gameOver' ? 'Again' : 'Pause') }
				 </Button>
				 </Col>
				 </Row>*/ }
				{ this.state.gameStatus !== 'playing' ?
					<GameMenu Param={ this.Param }
					          topScores={ this.state.topScores }
					          changeGameStatus={ this.changeGameStatus }
					          setCameraZ={ this.setCameraZ }
					          gameStatus={ this.state.gameStatus }
					          sendGameMessage={this.sendGameMessage}
					/>
					:
					null
				}
			</div>
		);
	};
}

export default MrThree;

// TODO seperate mouse tracker xy with z
