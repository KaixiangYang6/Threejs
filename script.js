//Scene
const scene = new THREE.Scene;

//Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });  //Hexadecimal color/
const cube = new THREE.Mesh(geometry, material);  //create a mesh object called cube
scene.add(cube);    //add a cube into the scene

//Size
const sizes = {
    width: 800,
    height: 600
}


//Camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);   //(focal length，aspect radio)
scene.add(camera);

