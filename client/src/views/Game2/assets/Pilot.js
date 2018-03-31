import * as THREE from 'three'
import {Colors} from './setting'
export default class Pilot{
	constructor(){
		this.mesh = new THREE.Object3D();
		this.mesh.name = "pilot";
		// angleHairs是用于后面头发的动画的属性
		this.angleHairs=0;
		// 飞行员的身体
		var bodyGeom = new THREE.BoxGeometry(15,15,15);
		var bodyMat = new THREE.MeshPhongMaterial({color:Colors.brown, flatShading:true});
		var body = new THREE.Mesh(bodyGeom, bodyMat);
		body.position.set(2,-12,0);
		this.mesh.add(body);

		// 飞行员的脸部
		var faceGeom = new THREE.BoxGeometry(10,10,10);
		var faceMat = new THREE.MeshLambertMaterial({color:Colors.pink});
		var face = new THREE.Mesh(faceGeom, faceMat);
		this.mesh.add(face);

		// 飞行员的头发
		var hairGeom = new THREE.BoxGeometry(4,4,4);
		var hairMat = new THREE.MeshLambertMaterial({color:Colors.black});
		var hair = new THREE.Mesh(hairGeom, hairMat);
		// 调整头发的形状至底部的边界，这将使它更容易扩展。
		hair.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,2,0));

		// 创建一个头发的容器
		var hairs = new THREE.Object3D();

		// 创建一个头发顶部的容器（这会有动画效果）
		this.hairsTop = new THREE.Object3D();

		// 创建头顶的头发并放置他们在一个3*4的网格中
		for (var i=0; i<12; i++){
			var h = hair.clone();
			var col = i%3;
			var row = Math.floor(i/3);
			var startPosZ = -4;
			var startPosX = -4;
			h.position.set(startPosX + row*4, 0, startPosZ + col*4);
			this.hairsTop.add(h);
		}
		hairs.add(this.hairsTop);

		// 创建脸庞的头发
		var hairSideGeom = new THREE.BoxGeometry(12,4,2);
		hairSideGeom.applyMatrix(new THREE.Matrix4().makeTranslation(-6,0,0));
		var hairSideR = new THREE.Mesh(hairSideGeom, hairMat);
		var hairSideL = hairSideR.clone();
		hairSideR.position.set(8,-2,6);
		hairSideL.position.set(8,-2,-6);
		hairs.add(hairSideR);
		hairs.add(hairSideL);

		// 创建后脑勺的头发
		var hairBackGeom = new THREE.BoxGeometry(2,8,10);
		var hairBack = new THREE.Mesh(hairBackGeom, hairMat);
		hairBack.position.set (-1, -4, 0);
		hairs.add(hairBack);
		hairs.position.set(-5,5,0);

		this.mesh.add(hairs);

		var glassGeom = new THREE.BoxGeometry(5,5,5);
		var glassMat = new THREE.MeshLambertMaterial({color:Colors.black});
		var glassR = new THREE.Mesh(glassGeom,glassMat);
		glassR.position.set(6,0,3);
		var glassL = glassR.clone();
		glassL.position.z = -glassR.position.z;

		var glassAGeom = new THREE.BoxGeometry(11,1,11);
		var glassA = new THREE.Mesh(glassAGeom, glassMat);
		this.mesh.add(glassR);
		this.mesh.add(glassL);
		this.mesh.add(glassA);

		var earGeom = new THREE.BoxGeometry(2,3,2);
		var earL = new THREE.Mesh(earGeom,faceMat);
		earL.position.set(0,0,-6);
		var earR = earL.clone();
		earR.position.set(0,0,6);
		this.mesh.add(earL);
		this.mesh.add(earR);
	}
	updateHairs = function(){
		// 获得头发
		var hairs = this.hairsTop.children;

		// 根据 angleHairs 的角度更新头发
		var l = hairs.length;
		for (var i=0; i<l; i++){
			var h = hairs[i];
			// 每根头发将周期性的基础上原始大小的75%至100%之间作调整。
			h.scale.y = .75 + Math.cos(this.angleHairs+i/3)*.25;
		}
		// 在下一帧增加角度
		this.angleHairs += 0.16;
	}
}
