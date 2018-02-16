import React, { Component } from 'react'
import * as THREE from 'three'

class Scene extends Component {
	constructor(props) {
		super(props)
		this.theta=0

	}

	componentDidMount() {
		const width = this.mount.clientWidth
		const height = this.mount.clientHeight

		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(
			75,
			width / height,
			0.1,
			1000
		)
		const renderer = new THREE.WebGLRenderer({ antialias: true })
		const geometry = new THREE.BoxGeometry(1, 1, 1)
		const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
		const cube = new THREE.Mesh(geometry, material)

		camera.position.z = 20
		scene.add(cube)
		renderer.setClearColor('#000000')
		renderer.setSize(width, height)

		this.scene = scene
		this.camera = camera
		this.renderer = renderer
		this.material = material
		this.cube = cube

		this.mount.appendChild(this.renderer.domElement)
		this.start()
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
		this.theta +=0.1
		this.cube.rotation.x += 0.01
		this.cube.rotation.y += 0.01
		this.camera.position.z = 20 * Math.sin( THREE.Math.degToRad( this.theta ) );

		this.renderScene()
		this.frameId = window.requestAnimationFrame(this.animate)
	}

	renderScene() {
		this.renderer.render(this.scene, this.camera)
	}

	render() {
		return (
			<div
				style={{ borderRadius:'50%',width: '100%', height: '100%', position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)' }}
				ref={(mount) => { this.mount = mount }}
			/>
		)
	}
}

export default Scene