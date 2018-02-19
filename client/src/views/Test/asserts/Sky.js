import * as THREE from 'three';
import Cloud from './Cloud';

export default class Sky {
	constructor (cloudNumb) {
// 创建一个空的容器
		this.mesh = new THREE.Object3D();

		// 选取若干朵云散布在天空中
		this.nClouds = cloudNumb;

		// 把云均匀地散布
		// 我们需要根据统一的角度放置它们
		var stepAngle = Math.PI*2 / this.nClouds;

		// 创建云对象
		for(var i=0; i<this.nClouds; i++){
			var c = new Cloud();

			// 设置每朵云的旋转角度和位置
			// 因此我们使用了一点三角函数
			var a = stepAngle*i; //这是云的最终角度
			var h = 750 + Math.random()*200; // 这是轴的中心和云本身之间的距离

			// 三角函数！！！希望你还记得数学学过的东西 :)
			// 假如你不记得:
			// 我们简单地把极坐标转换成笛卡坐标
			c.mesh.position.y = Math.sin(a)*h;
			c.mesh.position.x = Math.cos(a)*h;

			// 根据云的位置旋转它
			c.mesh.rotation.z = a + Math.PI/2;

			// 为了有更好的效果，我们把云放置在场景中的随机深度位置
			c.mesh.position.z = -400-Math.random()*400;

			// 而且我们为每朵云设置一个随机大小
			var s = 1+Math.random()*2;
			c.mesh.scale.set(s,s,s);

			// 不要忘记将每朵云的网格添加到场景中
			this.mesh.add(c.mesh);
		}
	}
}
