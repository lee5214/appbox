import * as THREE from 'three'

class Enemy {
	constructor(){
		var geom = new THREE.TetrahedronGeometry(8,2);
		var mat = new THREE.MeshPhongMaterial({
			color:Colors.red,
			shininess:0,
			specular:0xffffff,
			shading:THREE.FlatShading
		});
		this.mesh = new THREE.Mesh(geom,mat);
		this.mesh.castShadow = true;
		this.angle = 0;
		this.dist = 0;
	}
}
class EnemiesHolder {
	this;
.
	mesh = new THREE.Object3D ();
	this;
.
	ennemiesInUse = [];
	this;
.
	spawnEnemies = (nEnemies) => {
		for (var i=0; i<nEnemies; i++){
			var ennemy;
			if (ennemiesPool.length) {
				ennemy = ennemiesPool.pop();
			}else{
				ennemy = new Ennemy();
			}

			ennemy.angle = - (i*0.1);
			ennemy.distance = game.seaRadius + game.planeDefaultHeight + (-1 + Math.random() * 2) * (game.planeAmpHeight-20);
			ennemy.mesh.position.y = -game.seaRadius + Math.sin(ennemy.angle)*ennemy.distance;
			ennemy.mesh.position.x = Math.cos(ennemy.angle)*ennemy.distance;

			this.mesh.add(ennemy.mesh);
			this.ennemiesInUse.push(ennemy);
		}
	}
}

export {Enemy, EnemiesHolder}
