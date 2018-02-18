import React, { Component } from 'react';
import * as THREE from 'three';
import _ from 'lodash';

let Colors = {
	red : 0xf25346,
	white : 0xd8d0d1,
	brown : 0x59332e,
	pink : 0xF5986E,
	brownDark : 0x23190f,
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
		const renderer = new THREE.WebGLRenderer (/*{alpha : true, antialias : true}*/);

		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = 1000;

		renderer.setClearColor ('#000000');
		renderer.setSize (width, height);

		this.scene = scene;
		this.camera = camera;
		this.renderer = renderer;
		this.scene.add (this.sphere);
		this.container.appendChild (this.renderer.domElement);

	};

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

	};
	createSphere = (r, w, h, colorNum) => {
		let colorPicker = [ 'red', 'white', 'brown', 'pink', 'brownDark', 'blue' ];
		let geometry = new THREE.SphereGeometry (r, w, h);
		let mat = new THREE.MeshPhongMaterial ({
			color : Colors[ colorPicker[ colorNum] ],
			emissive: 0x072534,
			side: THREE.DoubleSide,
			flatShading: true
		});

		let sphere = new THREE.Mesh (geometry, mat);
		this.sphere = sphere;
		this.scene.add (sphere);
	};
	updateNewSphere = (r, w, h, color) => {
		this.setState ({radius : r, widthSegments : w, heightSegments : h, color : color});
		this.scene.remove (this.sphere);
		this.createSphere (r, w, h, color);
	};
	init = () => {
		this.createScene ();
		this.createLights ();
		this.createSphere (6, 6, 3);
		setInterval (() => {this.handleRandomSphere ();}, 20000);
		document.addEventListener ('click', this.handleRandomSphere, false);
	};
	// events
	handleRandomSphere = () => {
		let r = _.random (2, 6), w = _.random (3, 10), h = _.random (3, 10), color = _.random (0,5);
		this.updateNewSphere (r, w, h, color);
	};
	handleKeyDown = (e) => {
		if (e.keyCode === 27) {
			console.log ('true');
		}
	};

	//resize = () => this.forceUpdate()
	componentDidMount () {
		this.init ();
		this.start ();
		//window.addEventListener('resize', this.resize)
	}

	componentWillUnmount () {
		this.stop ();
		this.container.removeChild (this.renderer.domElement);
		//window.removeEventListener('resize', this.resize)
	}

	handleWindowResize () {
		// 更新渲染器的高度和宽度以及相机的纵横比
		let h = this.container.clientHeight;
		let w = this.container.clientWidth;
		this.renderer.setSize (w, h);
		this.camera.aspect = w / h;
		this.camera.updateProjectionMatrix ();
	}

	start = () => {
		if (!this.frameId) {
			this.frameId = requestAnimationFrame (this.animate);
		}
	};

	stop = () => {
		cancelAnimationFrame (this.frameId);
	};

	update = (a, b, c) => {
		// this.sphere.position.x = this.state.test||0;
		// this.sphere.scale.x = this.state.test || 100
		// this.sphere.scale.y = this.state.test/10 || 10

		//this.scene.remove(this.sphere)
		//this.createSphere(10,20,1)

	};
	animate = () => {
		//this.theta +=0.1
		if (this.camera.position.z >= 30) {
			this.camera.position.z -= 10;
		}
		this.sphere.rotation.x += 0.01;
		this.sphere.rotation.y += 0.01;
		this.update ();

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
					{ this.state.radius }{ this.state.widthSegments }{ this.state.heightSegments }
				</div>
			</div>
		);
	}
}

export default Scene;

// TODO seperate mouse tracker xy with z
