import React from 'react';
import * as THREE from 'three'
import { Colors } from './setting';

export default class Cloud {
	constructor () {
		this.mesh = new THREE.Object3D ();
		// 创建一个正方体
		// 这个形状会被复制创建云
		let geom = new THREE.BoxGeometry (20, 20, 20);
		// 创建材质；一个简单的白色材质就可以达到效果
		let mat = new THREE.MeshPhongMaterial ({
			color : Colors.white,
		});
		// 随机多次复制几何体
		let nBlocs = 3 + Math.floor (Math.random () * 3);
		for (let i = 0; i < nBlocs; i++) {

			// 通过复制几何体创建网格
			let m = new THREE.Mesh (geom, mat);
			// 随机设置每个正方体的位置和旋转角度
			m.position.x = i * 15;
			m.position.y = Math.random () * 10;
			m.position.z = Math.random () * 10;
			m.rotation.z = Math.random () * Math.PI * 2;
			m.rotation.y = Math.random () * Math.PI * 2;

			// 随机设置正方体的大小
			let s = .1 + Math.random () * .9;
			m.scale.set (s, s, s);

			// 允许每个正方体生成投影和接收阴影
			m.castShadow = true;
			m.receiveShadow = true;

			// 将正方体添加至开始时我们创建的容器中
			this.mesh.add (m);
		}
	}
}
