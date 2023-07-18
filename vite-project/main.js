import * as THREE from "three";



const Scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry( 3, 64, 64);
const material = new THREE.MeshStandardMaterial( {color: "#00ff83"});
const mesh = new THREE.Mesh( geometry, material);

Scene.add(mesh)

const camera = new THREE.PerspectiveCamera(45, 800,600);
Scene.add(camera);


//renderer

const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(800,600)

renderer.render(Scene, camera)