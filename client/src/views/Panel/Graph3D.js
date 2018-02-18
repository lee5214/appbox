import React, { Component } from 'react';
import * as THREE from 'three';
import _ from 'lodash';

let Colors = {
	red : 0xff0000,
	white : 0xd8d0d1,
	purple : 0xFF00FF,
	yellow : 0xffff00,
	green: 0x7cfc00,
	blue : 0x2fa1d6,
};

class Scene extends Component {
	constructor (props) {
		super (props);
		//this.theta=0
		this.state = {
			radius : 4,
			widthSegments : 4,
			heightSegments : 4,
			rotateX : 0.1,
			rotateY : 0.1,
			rotateSpeed : 1,
			color : 0,
		};
	}

	createScene = () => {
		const width = this.container.clientWidth;
		const height = this.container.clientHeight;
		const scene = new THREE.Scene ();
		const camera = new THREE.PerspectiveCamera (
			60, // fieldOfView
			width / height, // aspectRatio
			1, // nearPlane
			1000, // farPlane
		);
		const renderer = new THREE.WebGLRenderer ({alpha : true, antialias : true});

		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = 600;

		renderer.setClearColor ('#000000');
		renderer.setSize (width, height);


		this.scene = scene;
		this.scene.fog = new THREE.Fog (0xffffff, 0.015, 100);
		this.camera = camera;
		this.renderer = renderer;
		this.container.appendChild (this.renderer.domElement);

		//window.addEventListener('resize', this.handleWindowResize, false);
	};
	/*handleWindowResize() {
	 this.height = window.innerHeight;
	 this.width = window.innerWidth;
	 this.renderer.setSize(this.width, this.height);
	 camera.aspect = this.width / this.height;
	 camera.updateProjectionMatrix();
	 }*/
	createLights = () => {
		let lights = [];
		lights[ 0 ] = new THREE.PointLight (0xffffff, 1, 0);
		lights[ 1 ] = new THREE.PointLight (0xffffff, 1, 0);
		lights[ 2 ] = new THREE.PointLight (0xffffff, 1, 0);
		lights[ 0 ].position.set (0, 200, 0);
		lights[ 1 ].position.set (100, 200, 100);
		lights[ 2 ].position.set (-100, -200, -100);
		this.scene.add (lights[ 0 ]);
		this.scene.add (lights[ 1 ]);
		this.scene.add (lights[ 2 ]);
		// let mesh = new THREE.Object3D ();
		// mesh.add (new THREE.LineSegments (
		// 	new THREE.Geometry (),
		// 	new THREE.LineBasicMaterial ({
		// 		color : 0xffffff,
		// 		transparent : true,
		// 		opacity : 0.5,
		// 	}),
		// ));
		// mesh.add (new THREE.Mesh (
		// 	new THREE.Geometry (),
		// 	new THREE.MeshPhongMaterial ({
		// 		color : 0x156289,
		// 		emissive : 0x072534,
		// 		side : THREE.DoubleSide,
		// 		flatShading : true,
		// 	}),
		// ));
		// this.scene.add (mesh);
	};
	createSphere = (r, w, h, colorNum, roX, roY) => {
		let colorPicker = Object.keys(Colors).map(key => key)
		let geometry = new THREE.SphereGeometry (r, w, h);
		let mat = new THREE.MeshPhongMaterial ({
			color : Colors[ colorPicker[ colorNum ] ]||0,
			emissive : 0x072534,
			side : THREE.DoubleSide,
			flatShading : true,
			//fog: true
		});

		let sphere = new THREE.Mesh (geometry, mat);
		sphere.rotation.x = roX || 0;
		sphere.rotation.y = roY || 0;
		this.sphere = sphere;
		this.scene.add (this.sphere);
	};
	updateNewSphere = (r, w, h, color, roX, roY) => {
		this.setState ({radius : r, widthSegments : w, heightSegments : h, color : color});
		this.scene.remove (this.sphere);
		this.createSphere (r, w, h, color, roX, roY);
	};
	init = () => {
		this.createScene ();
		this.createLights ();
		this.createSphere (6, 6, 3);
		this.scene.add (this.sphere);
		setInterval (() => {
			clearInterval (this.startAnimation);
			this.handleRandomSphere ();
		}, 20000);
		document.addEventListener ('click', this.handleRandomSphere, false);
	};
	// events
	handleRandomSphere = () => {
		let ran = _.random (0, 20),
			r = _.random (4, 8),
			w = ran /*_.random (ran,10-ran)*/,
			h = (20 - ran) /*_.random (10,20-ran)*/,
			color = _.random (0, Object.keys(Colors).length-1),
			roX = _.random(0,1)===0?-1:1,
			roY = _.random(0,1)===0?-1:1,
			angX = _.random (0, 360),
			angY = _.random (0, 360),
			rotateSpeed = _.random(0.001,0.005);
		this.setState ({
			radius : r,
			widthSegments : w,
			heightSegments : h,
			roX : roX,
			roY : roY,
			angX : angX,
			angY : angY,
			rotateSpeed,
		});
		this.updateNewSphere (r, w, h, color, roX, roY);
	};

	//resize = () => this.forceUpdate()
	componentDidMount () {
		this.init ();
		this.start ();
		let startAnimation = setInterval (this.handleRandomSphere, 200);
		setTimeout (() => {
			clearInterval (startAnimation);
		}, 2000);
	}
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
	animate = () => {
		//this.theta +=0.1
		if (this.camera.position.z >= 30) {
			this.camera.position.z -= 5;
		}
		this.sphere.rotation.x += this.state.roX*this.state.rotateSpeed;
		this.sphere.rotation.y += this.state.roY*this.state.rotateSpeed;


		//this.camera.position.z = 20 * Math.sin( THREE.Math.degToRad( this.theta ) );
		this.renderScene ();
		this.frameId = window.requestAnimationFrame (this.animate);

	};

	renderScene () {
		this.renderer.render (this.scene, this.camera);
	}

	render () {
		let w = window.innerWidth * .5, h = window.innerWidth * .5;
		return (
			<div
				style={ {
					borderRadius : '50%', width : w, height : h, position : 'absolute', top : '50%', left : '50%',
					transform : 'translate(-50%,-50%)',
				} }
				ref={ (mount) => { this.container = mount; } }
			>
				{ /*<form onSubmit={ e => this.onSubmit (e) }>
				 <lable>
				 <input type="text" ref={ (input) => this.input = input }/>
				 <button type='submit' value="submit">change</button>
				 </lable>
				 </form>*/ }
				<div>
					{ this.state.radius },{ this.state.widthSegments },{ this.state.heightSegments },{this.state.color}
				</div>
			</div>
		);
	}
}

export default Scene;

// TODO seperate mouse tracker xy with z
