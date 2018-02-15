import React, { Component } from 'react'
import * as THREE from 'three'

class Scene extends Component {
	constructor(props) {
		super(props)

	}

	componentDidMount() {
		let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
		renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.autoClear = false;
		renderer.setClearColor(0x000000, 0.0);
		//document.getElementById('canvas').appendChild(renderer.domElement);

		let scene = new THREE.Scene();

		let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.z = 400;
		scene.add(camera);

		let circle = new THREE.Object3D();
		let skelet = new THREE.Object3D();
		let particle = new THREE.Object3D();

		scene.add(circle);
		scene.add(skelet);
		scene.add(particle);

		var geometry = new THREE.TetrahedronGeometry(2, 0);
		var geom = new THREE.IcosahedronGeometry(7, 1);
		var geom2 = new THREE.IcosahedronGeometry(15, 1);
		this.geometry = geometry
		this.geom=geom
		this.geom2=geom2

		var material = new THREE.MeshPhongMaterial({
			color: 0xffffff,
			shading: THREE.FlatShading
		});

		for (var i = 0; i < 1000; i++) {
			var mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
			mesh.position.multiplyScalar(90 + (Math.random() * 700));
			mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
			particle.add(mesh);
		}

		var mat = new THREE.MeshPhongMaterial({
			color: 0xffffff,
			shading: THREE.FlatShading
		});

		var mat2 = new THREE.MeshPhongMaterial({
			color: 0xffffff,
			wireframe: true,
			side: THREE.DoubleSide

		});

		var planet = new THREE.Mesh(geom, mat);
		planet.scale.x = planet.scale.y = planet.scale.z = 16;
		circle.add(planet);

		var planet2 = new THREE.Mesh(geom2, mat2);
		planet2.scale.x = planet2.scale.y = planet2.scale.z = 10;
		skelet.add(planet2);

		var ambientLight = new THREE.AmbientLight(0x999999 );
		scene.add(ambientLight);

		var lights = [];
		lights[0] = new THREE.DirectionalLight( 0xffffff, 1 );
		lights[0].position.set( 1, 0, 0 );
		lights[1] = new THREE.DirectionalLight( 0x11E8BB, 1 );
		lights[1].position.set( 0.75, 1, 0.5 );
		lights[2] = new THREE.DirectionalLight( 0x8200C9, 1 );
		lights[2].position.set( -0.75, -1, 0.5 );
		scene.add( lights[0] );
		scene.add( lights[1] );
		scene.add( lights[2] );

		this.scene = scene
		this.camera = camera
		this.renderer = renderer
		this.material = material
	}

	componentWillUnmount() {
		this.stop()
		this.mount.removeChild(this.renderer.domElement)
	}

	start=()=> {
		if (!this.frameId) {
			this.frameId = requestAnimationFrame(this.animate)
		}
	}

	stop=()=> {
		cancelAnimationFrame(this.frameId)
	}

	animate=()=> {
		this.cube.rotation.x += 0.01
		this.cube.rotation.y += 0.01

		this.renderScene()
		this.frameId = window.requestAnimationFrame(this.animate)
	}

	renderScene() {
		this.renderer.render(this.scene, this.camera)
	}

	render() {
		return (
			<div
				style={{ width: '400px', height: '400px' }}
				ref={(mount) => { this.mount = mount }}
			/>
		)
	}
}

export default Scene
