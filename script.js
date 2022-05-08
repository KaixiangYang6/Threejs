//Scene
const scene = new THREE.Scene;

//Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: '#156156' });  //Hexadecimal color/
const cube = new THREE.Mesh(geometry, material);  //create a mesh object called cube
scene.add(cube);    //add a cube into the scene

//Size
const sizes = {
    width: 800,
    height: 600
}


//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);   //(focal length，aspect ratio)
camera.position.z = 3;
scene.add(camera);

//Renderer
const canvas = document.querySelector('.webgl'); //use document.querySelector()to retrieve the canvas element we created in the HTML and store it in a `canvas` variable.
console.log(canvas);
const renderer = new THREE.WebGLRenderer({  //create the WebGLRenderer with an empty objec
    canvas: canvas      //create a property called canvas, and fetch canvas 
})
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

