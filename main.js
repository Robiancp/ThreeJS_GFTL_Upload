import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaaaa)
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.gammaOutput = true;

document.body.appendChild(renderer.domElement);

const canvas = document.querySelector(".webgl")
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100)
camera.position.set(0, 1.5, 0)

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 1;
controls.maxDistance = 20;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 0, 0);
controls.update();

const loader = new GLTFLoader()
loader.load('assets/tc_gltf.gltf', function(gltf){
  console.log(gltf)
  const root = gltf.scene;
  root.scale.set(0.01, 0.01, 0.01)
  scene.add( root );
	},

	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
)

const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0,5,0)
scene.add(light)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

function animate(){
  requestAnimationFrame(animate)
  controls.update();
  renderer.render(scene,camera)
}

animate()