export const Colors = {
	red:0xf25346,
	white:0xffffff,
	brown:0x59332e,
	pink:0xF5986E,
	brownDark:0x23190f,
	blue:0x68c3c0,
	black: 0x000000,
};

export const DefaultParam = {
	worldSpeed: 1,
	bulletTime: false,
	speed : 0,
	initSpeed : .00035,
	baseSpeed : .00035,
	targetBaseSpeed : .00035,
	incrementSpeedByTime : .0000025,
	incrementSpeedByLevel : .000005,
	distanceForSpeedUpdate : 100,
	speedLastUpdate : 0,

	distance : 0,
	ratioSpeedDistance : 50,
	energy : 100,
	ratioSpeedEnergy : 3,

	level : 1,
	levelLastUpdate : 0,
	distanceForLevelUpdate : 1000,

	planeDefaultHeight : 100,
	planeAmpHeight : 80,
	planeAmpWidth : 75,
	planeMoveSensivity : 0.005,
	planeRotXSensivity : 0.0008,
	planeRotZSensivity : 0.0004,
	planeFallSpeed : .001,
	planeMinSpeed : 1.2,
	planeMaxSpeed : 1.6,
	planeSpeed : 0,
	planeCollisionDisplacementX : 0,
	planeCollisionSpeedX : 0,

	planeCollisionDisplacementY : 0,
	planeCollisionSpeedY : 0,

	seaRadius : 600,
	seaLength : 800,
	//seaRotationSpeed:0.006,
	wavesMinAmp : 5,
	wavesMaxAmp : 20,
	wavesMinSpeed : 0.001,
	wavesMaxSpeed : 0.003,

	cameraFarPos : 500,
	cameraNearPos : 150,
	cameraSensivity : 0.002,

	coinDistanceTolerance : 15,
	coinValue : 3,
	coinsSpeed : .5,
	coinLastSpawn : 0,
	distanceForCoinsSpawn : 100,

	enemyDistanceTolerance : 10,
	enemyValue : 10,
	enemiesSpeed : .6,
	enemyLastSpawn : 0,
	distanceForEnemiesSpawn : 100,
	enemyBulletTime : 30,

	status : "playing",
};

export const normalize = (v, vmin, vmax, tmin, tmax) => {
	let nv = Math.max (Math.min (v, vmax), vmin);
	let dv = vmax - vmin;
	let pc = (nv - vmin) / dv;
	let dt = tmax - tmin;
	let tv = tmin + (pc * dt);
	//console.log(v,vmin,vmax,tmin,tmax,dt,tv)
	return tv;
};
