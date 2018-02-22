import * as THREE from 'three';
import {Colors, Param} from './setting'
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
	spawnEnemies = (nEnemies, enemiesPool) =>{
		for (let i = 0; i < nEnemies; i++) {
			let enemy;
			if (enemiesPool.length) {
				enemy = enemiesPool.pop ();
			} else {
				enemy = new Enemy ();
			}
			this.totle += 1;

			enemy.angle = -(i * 0.1);
			enemy.distance = Param.seaRadius + Param.planeDefaultHeight + (-1 + Math.random () * 2) * (Param.planeAmpHeight - 20);
			enemy.mesh.position.y = -Param.seaRadius + Math.sin (enemy.angle) * enemy.distance;
			enemy.mesh.position.x = Math.cos (enemy.angle) * enemy.distance;

			this.mesh.add (enemy.mesh);
			//this.enemiesInUse.push (enemy);
		}
	}
	rotateEnemies = (airplne,enemiesPool) =>{
		for (let i = 0; i < this.enemiesInUse.length; i++) {
			let enemy = this.enemiesInUse[ i ];
			enemy.angle += Param.speed * Param.deltaTime * Param.enemiesSpeed;

			if (enemy.angle > Math.PI * 2) enemy.angle -= Math.PI * 2;

			enemy.mesh.position.y = -Param.seaRadius + Math.sin (enemy.angle) * enemy.distance;
			enemy.mesh.position.x = Math.cos (enemy.angle) * enemy.distance;
			enemy.mesh.rotation.z += Math.random () * .1;
			enemy.mesh.rotation.y += Math.random () * .1;

			//let globalEnemyPosition =  enemy.mesh.localToWorld(new THREE.Vector3());
			let diffPos = airplane.mesh.position.clone ().sub (enemy.mesh.position.clone ());
			let d = diffPos.length ();
			if (d < Param.enemyDistanceTolerance) {

				//particlesHolder.spawnParticles (enemy.mesh.position.clone (), 15, Colors.red, 3);

				enemiesPool.unshift (this.enemiesInUse.splice (i, 1)[ 0 ]);
				this.mesh.remove (enemy.mesh);
				Param.planeCollisionSpeedX = 100 * diffPos.x / d;
				Param.planeCollisionSpeedY = 100 * diffPos.y / d;
				ambientLight.intensity = 2;

				removeEnergy ();
				i--;
			} else if (enemy.angle > Math.PI) {
				enemiesPool.unshift (this.enemiesInUse.splice (i, 1)[ 0 ]);
				this.mesh.remove (enemy.mesh);
				i--;
			}
		}
	}
}

export { Enemy, EnemiesHolder };
