import * as THREE from 'three';
import { Colors } from './setting';
import Pilot from './Pilot'
export default class AirPlane {
	constructor () {
		this.mesh = new THREE.Object3D ();

		// 创建机舱
		let geomCockpit = new THREE.BoxGeometry (80, 50, 50, 1, 1, 1);
		let matCockpit = new THREE.MeshPhongMaterial ({color : Colors.red, flatShading : true,})

// 我们可以通过访问形状中顶点数组中一组特定的顶点
// 然后移动它的 x, y, z 属性:
		geomCockpit.vertices[ 4 ].y -= 10;
		geomCockpit.vertices[ 4 ].z += 20;
		geomCockpit.vertices[ 5 ].y -= 10;
		geomCockpit.vertices[ 5 ].z -= 20;
		geomCockpit.vertices[ 6 ].y += 30;
		geomCockpit.vertices[ 6 ].z += 20;
		geomCockpit.vertices[ 7 ].y += 30;
		geomCockpit.vertices[ 7 ].z -= 20;

		let cockpit = new THREE.Mesh (geomCockpit, matCockpit);
		cockpit.castShadow = true;
		cockpit.receiveShadow = true;
		this.mesh.add (cockpit);

		// 创建引擎
		let geomEngine = new THREE.BoxGeometry (20, 50, 50, 1, 1, 1);
		let matEngine = new THREE.MeshPhongMaterial ({
			color : Colors.white,
			flatShading : true,
		});
		let engine = new THREE.Mesh (geomEngine, matEngine);
		engine.position.x = 40;
		engine.castShadow = true;
		engine.receiveShadow = true;
		this.mesh.add (engine);

		// 创建机尾
		let geomTailPlane = new THREE.BoxGeometry (15, 20, 5, 1, 1, 1);
		let matTailPlane = new THREE.MeshPhongMaterial ({
			color : Colors.red,
			flatShading : true,
		});
		let tailPlane = new THREE.Mesh (geomTailPlane, matTailPlane);
		tailPlane.position.set (-35, 25, 0);
		tailPlane.castShadow = true;
		tailPlane.receiveShadow = true;
		this.mesh.add (tailPlane);

		// 创建机翼
		let geomSideWing = new THREE.BoxGeometry (40, 8, 150, 1, 1, 1);
		let matSideWing = new THREE.MeshPhongMaterial ({
			color : Colors.red,
			flatShading : true,
		});
		let sideWing = new THREE.Mesh (geomSideWing, matSideWing);
		sideWing.castShadow = true;
		sideWing.receiveShadow = true;
		this.mesh.add (sideWing);

		// 创建螺旋桨
		let geomPropeller = new THREE.BoxGeometry (20, 10, 10, 1, 1, 1);
		let matPropeller = new THREE.MeshPhongMaterial ({
			color : Colors.brown,
			flatShading : true,
		});
		this.propeller = new THREE.Mesh (geomPropeller, matPropeller);
		this.propeller.castShadow = true;
		this.propeller.receiveShadow = true;

		// 创建螺旋桨的桨叶
		let geomBlade = new THREE.BoxGeometry (1, 100, 20, 1, 1, 1);
		let matBlade = new THREE.MeshPhongMaterial ({
			color : Colors.brownDark,
			flatShading : true,
		});

		let blade = new THREE.Mesh (geomBlade, matBlade);
		blade.position.set (8, 0, 0);
		blade.castShadow = true;
		blade.receiveShadow = true;
		this.propeller.add (blade);
		this.propeller.position.set (50, 0, 0);
		this.mesh.add (this.propeller);

	}
}
