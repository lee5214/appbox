import React, { Component } from 'react';
import * as THREE from 'three';

let Colors = {
	red : 0xf25346,
	white : 0xd8d0d1,
	brown : 0x59332e,
	pink : 0xF5986E,
	brownDark : 0x23190f,
	blue : 0x68c3c0,
};
let Sea = function () {
	var geom = new THREE.SphereGeometry(1 , 10, 10 );
	geom.applyMatrix (new THREE.Matrix4 ().makeRotationX (-Math.PI / 2));

	// 重点：通过合并顶点，我们确保海浪的连续性
	geom.mergeVertices ();

	// 获得顶点
	var l = geom.vertices.length;

	// 创建一个新的数组存储与每个顶点关联的值：
	this.waves = [];

	for (var i = 0; i < l; i++) {
		// 获取每个顶点
		var v = geom.vertices[ i ];
		// 存储一些关联的数值
		this.waves.push ({
			y : v.y,
			x : v.x,
			z : v.z,
			// 随机角度
			ang : 1,//Math.random () * Math.PI * 2,
			// 随机距离
			amp : 5 + Math.random () * 15,
			// 在0.016至0.048度/帧之间的随机速度
			speed : 0.016 + Math.random () * 0.032,
		});
	}
	;
	var mat = new THREE.MeshPhongMaterial ({
		color : Colors.blue,
		transparent : true,
		opacity : .8,
		shading : THREE.FlatShading,
	});

	this.mesh = new THREE.Mesh (geom, mat);
	this.mesh.receiveShadow = true;
};

Sea.prototype.moveWaves = function () {

	// 获取顶点
	var verts = this.mesh.geometry.vertices;
	var l = verts.length;

	for (var i = 0; i < l; i++) {
		var v = verts[ i ];

		// 获取关联的值
		var vprops = this.waves[ i ];

		// 更新顶点的位置
		v.x = vprops.x + Math.cos (vprops.ang) * vprops.amp;
		v.y = vprops.y + Math.sin (vprops.ang) * vprops.amp;

		// 下一帧自增一个角度
		vprops.ang += vprops.speed;
	}

	// 告诉渲染器代表大海的几何体发生改变
	// 事实上，为了维持最好的性能
	// Three.js会缓存几何体和忽略一些修改
	// 除非加上这句
	this.mesh.geometry.verticesNeedUpdate = true;
};

class Scene extends Component {
	constructor (props) {
		super (props);
		//this.theta=0
		this.scene = null;
		this.camera = null;
		this.renderer = null;
		this.material = null;
		this.container = null;
	}
	createScene = () => {
		const width = this.container.clientWidth;
		const height = this.container.clientHeight;
		const scene = new THREE.Scene ();
		const camera = new THREE.PerspectiveCamera (
			60, // fieldOfView
			width / height, // aspectRatio
			1, // nearPlane
			100, // farPlane
		);
		const renderer = new THREE.WebGLRenderer (/*{alpha : true, antialias : true}*/);

		var geometry = new THREE.SphereGeometry( 5,32,32 );
		var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
		var sphere = new THREE.Mesh( geometry, material );
		this.sphere = sphere

		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = 20;

		renderer.setClearColor ('#000000');
		renderer.setSize (width, height);

		this.scene = scene;
		this.camera = camera;
		this.renderer = renderer;
		this.scene.add(this.sphere)
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
		let hemisphereLight = new THREE.HemisphereLight (0xaaaaaa, 0x000000, .9);
		let shadowLight = new THREE.DirectionalLight (0xffffff, .9);
		shadowLight.position.set (150, 350, 350);
		shadowLight.castShadow = true;
// 定义可见域的投射阴影
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
	};
	createSea = () => {
		this.sea = new Sea ();
		// 在场景底部，稍微推挤一下
		this.sea.mesh.position.y = 0;
		// 添加大海的网格至场景
		this.scene.add (this.sea.mesh);
	};
	init = () => {
		this.createScene ();
		this.createLights ();
		this.createSea ();
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

	animate = () => {
		//this.theta +=0.1
		this.sea.moveWaves ();
		this.sea.mesh.rotation.z += .005;
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
				<div className={ 'overlayLED' }/>
			</div>
		);
	}
}

export default Scene;

// TODO seperate mouse tracker xy with z
