import * as THREE from "three";
import "/style.css"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


const scene = new THREE.Scene();
/*
const geometry = new THREE.SphereGeometry( 3, 64, 64);
const material = new THREE.MeshStandardMaterial( {color: "#FFDA86"});
const mesh = new THREE.Mesh( geometry, material);
*/
//scene.add(mesh)

// sizes screen
const gltfloader = new GLTFLoader();
gltfloader.load('Shiba/scene.gltf', (gltfScene) => {
  gltfScene.scene.scale.set(5,5,5)
  scene.add(gltfScene.scene)
}) 

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const light =  new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0,10,10)
scene.add(light)


// OrthographicCamera( sizes.width / - 150, sizes.width / 150, sizes.height / 100, sizes.height / - 100, 0.1, 1000 );
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height)
camera.position.z = 20
scene.add(camera);


//renderer

const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)


window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // update camera
  
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const controls = new OrbitControls(camera,  canvas)
controls.enableDamping = true
controls.autoRotate = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotateSpeed = 5
controls.material = 0.6



const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()