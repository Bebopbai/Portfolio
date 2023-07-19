import * as THREE from "three";
import "/style.css"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Color } from "three";


const scene = new THREE.Scene();
scene.background = new Color("#FFE9B3");
/*
const geometry = new THREE.SphereGeometry( 3, 64, 64);
const material = new THREE.MeshStandardMaterial( {color: "#FFDA86"});
const mesh = new THREE.Mesh( geometry, material);
*/
//scene.add(mesh)

// sizes screen
const gltfloader = new GLTFLoader();
gltfloader.load('./assets/radial_symmetry_test/scene.gltf', (gltfScene) => {
  gltfScene.scene.scale.set(0.1,0.1,0.1)
  
  gltfScene.scene.position.y = size / 10
  
  
  scene.add(gltfScene.scene)
}) 

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const light =  new THREE.HemisphereLight(0xffffff, 1, 3)
light.position.set(0,0,0)
scene.add(light)





const size = 45
const aspect = sizes.width / sizes.height;
//PerspectiveCamera(45, sizes.width/sizes.height)
// OrthographicCamera( sizes.width / - 150, sizes.width / 150, sizes.height / 100, sizes.height / - 100, 0.1, 1000 );
const camera = new THREE.OrthographicCamera( (size * aspect )/ - 2, (size * aspect)/ 2, size / 2, size / - 2, 0.1, 1000 );
camera.position.z = 30
scene.add(camera);


//RENDERERER

const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)


// RESIZING WINDOW 
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  
  const newAspect = sizes.width / sizes.height;

  camera.left = (size * newAspect) / -2;
  camera.right = (size * newAspect) / 2;


  // update camera
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})



// ORBIT CONTROLS
const controls = new OrbitControls(camera,  canvas)
controls.autoRotate = true
controls.enablePan = false
controls.enableZoom = false



// UPDATE SCENE// ANIMATING FRAMES
const loop = () => {
  controls.update()
  
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()