import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import gsap from 'gsap'

// Mouse
const cursor = {
  x: 0,
  y: 0
}

window.addEventListener('mousemove', e => {
  cursor.x = e.clientX / sizes.width - 0.5
  cursor.y = -(e.clientY / sizes.height - 0.5)
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'green' })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Position
// mesh.position.set(0.7, -0.6, 1)

// Scale
// mesh.scale.set(2, 0.5, 0.5)

// Rotation
// mesh.rotation.reorder('YXZ')
// mesh.rotation.set(Math.PI / 2, 0.3, 4)

// Group
// const group = new THREE.Group()
// scene.add(group)
// const cube1 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 'blue', wireframe: true })
// )
// const cube2 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 'green', wireframe: true })
// )
// const cube3 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: 'orange', wireframe: true })
// )
// cube1.position.set(-1, -0.5, 0.8)
// cube2.position.set(1.1, -0.2, 1.2)
// cube3.position.set(0.4, 1, 0.2)

// group.add(cube1)
// group.add(cube2)
// group.add(cube3)

// group.scale.y = 1.3
// group.position.x = 1

// Axis Helper
// const axesHelper = new THREE.AxesHelper(2)
// scene.add(axesHelper)

// Viewport
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
})

const aspectRatio = sizes.width / sizes.height

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
camera.position.set(0, 0, 3)
scene.add(camera)
// camera.lookAt(mesh.position)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

// Animation
// gsap.to(mesh.position, { x: 2, duration: 1, delay: 3 })

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // camera.position.x = Math.cos(elapsedTime) / 2
  // camera.position.y = Math.sin(elapsedTime) / 2
  // camera.lookAt(cube2.position)

  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  // camera.position.y = cursor.y * 5
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  // camera.lookAt(mesh.position)

  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
