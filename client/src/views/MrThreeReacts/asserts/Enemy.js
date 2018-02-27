import * as THREE from 'three';
import {Colors, DefaultParam} from './setting'
class Enemy {
	constructor () {
		let geom = new THREE.TetrahedronGeometry (8, 2);
		let mat = new THREE.MeshPhongMaterial ({
			color : Colors.red,
			shininess : 0,
			specular : 0xffffff,
			flatShading : true,
		});
		this.mesh = new THREE.Mesh (geom, mat);
		this.mesh.castShadow = true;
		this.angle = 0;
		this.dist = 0;
	}
}

class EnemiesHolder {
	constructor () {
		this.mesh = new THREE.Object3D ();
		this.enemiesInUse = [];
	}
	spawnEnemies = (level, enemiesPool) =>{
		for (let i = 0; i < level+1; i++) {
			let enemy;
			if (enemiesPool.length) {
				enemy = enemiesPool.pop ();
			} else {
				enemy = new Enemy ();
			}
			//this.totle += 1;

			enemy.angle = -(i * 0.1);
			enemy.distance = DefaultParam.seaRadius + DefaultParam.planeDefaultHeight + (-1 + Math.random () * 2) * (DefaultParam.planeAmpHeight + 20);
			enemy.mesh.position.y = -DefaultParam.seaRadius + Math.sin (enemy.angle) * enemy.distance;
			enemy.mesh.position.x = Math.cos (enemy.angle) * enemy.distance;

			this.mesh.add (enemy.mesh);
			this.enemiesInUse.push (enemy);
		}
	};
	rotateEnemies = (deltaTime,airplane,enemiesPool,worldSpeed,changeWorldSpeed,reduceEnergy) =>{
		for (let i = 0; i < this.enemiesInUse.length; i++) {
			let enemy = this.enemiesInUse[ i ];
			enemy.angle += worldSpeed * deltaTime * DefaultParam.enemiesSpeed/1000;
			if (enemy.angle > Math.PI * 2) enemy.angle -= Math.PI * 2;

			enemy.mesh.position.y = -DefaultParam.seaRadius + Math.sin (enemy.angle) * enemy.distance;
			enemy.mesh.position.x = Math.cos (enemy.angle) * enemy.distance;
			enemy.mesh.rotation.z += Math.random () * .1;
			enemy.mesh.rotation.y += Math.random () * .1;

			//let globalEnemyPosition =  enemy.mesh.localToWorld(new THREE.Vector3());

			let diffPos = airplane.mesh.position.clone ().sub (enemy.mesh.position.clone ());
			console.log(diffPos)
			let d = diffPos.length ();
			if(d<DefaultParam.enemyBulletTime){
				changeWorldSpeed(0.1)
			}
			if (d < DefaultParam.enemyDistanceTolerance) {
				//changeWorldSpeed(0.1)
				//particlesHolder.spawnParticles (enemy.mesh.position.clone (), 15, Colors.red, 3);

				enemiesPool.unshift (this.enemiesInUse.splice (i, 1)[ 0 ]);
				this.mesh.remove (enemy.mesh);
				this.planeCollisionSpeedX = 100 * diffPos.x / d;
				this.planeCollisionSpeedY = 100 * diffPos.y / d;
				//ambientLight.intensity = 2;
				//removeEnergy ();
				reduceEnergy()
				i--;
			} else if (enemy.angle > Math.PI) {
				//changeWorldSpeed(0.1)
				enemiesPool.unshift (this.enemiesInUse.splice (i, 1)[ 0 ]);
				this.mesh.remove (enemy.mesh);
				i--;
			}
		}
	}
}

export { Enemy, EnemiesHolder };
