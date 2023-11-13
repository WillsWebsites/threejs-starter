import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Position
mesh.position.set(0.7, -0.6, 1)

// Scale
mesh.scale.set(2, 0.5, 0.5)

// Rotation
mesh.rotation.reorder('YXZ')
mesh.rotation.set(Math.PI / 2, 0.3, 4)

// // Group
const group = new THREE.Group()
scene.add(group)
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 'blue', wireframe: true })
)
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 'green', wireframe: true })
)
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 'orange', wireframe: true })
)
cube1.position.set(-1, -0.5, 0.8)
cube2.position.set(1.1, -0.2, 1.2)
cube3.position.set(0.4, 1, 0.2)

group.add(cube1)
group.add(cube2)
group.add(cube3)

group.scale.y = 1.3
group.position.x = 1

// Axis Helper
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

const sizes = {
  width: 1000,
  height: 800
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0, 0, 3)
scene.add(camera)
// camera.lookAt(mesh.position)

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()

gsap.to(mesh.position, { x: 2, duration: 1, delay: 3 })

// Animation
const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  camera.position.x = Math.cos(elapsedTime) / 2
  camera.position.y = Math.sin(elapsedTime) / 2
  camera.lookAt(cube2.position)

  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
