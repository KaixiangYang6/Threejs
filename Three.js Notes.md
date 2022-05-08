# Three.js

Home page: <threejs.org>
Docs: <https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene>

a visible object we call that a mesh. Mesh is a combination of a geometry(the shape) and a material(how it looks)


Color  <https://threejs.org/docs/index.html?q=meshbasic#api/en/math/Color>
Multiple ways of express a color
```js
const color = new THREE.Color( 0xff000 );   
                                '#ff000'  //notice the single quote
                                'red'
                                "rgb(255, 0, 0)"
```

We need to render the scene from the camera point of view. The result is drawn into a canvas that is a HTML element used to draw stuff. Three.js will use WebGL to draw the render inside this canvas. We can create a canvas via HTML(recommend) or Three.js. 

create the `<canvas>` element before load the scripts with a `"webgl"` class that will be provided in js file

```html
<body>
    <canvas class="webgl"></canvas>
    <script src="./three.min.js"></script>
    <script src="./script.js"></script>
</body>
```

WebGLRenderer( parameters : Object )
parameters - (optional) object with properties defining the renderer's behaviour. The constructor also accepts no parameters at all. In all cases, it will assume sane defaults when parameters are missing. The following are valid parameters:
canvas - A canvas where the renderer draws its output. This corresponds to the domElement property below. If not passed in here, a new canvas element will be created.
`.WebGLRenderer()`是渲染器，用来显示摄像机画面的。需要在括号里构造多个属性properties。也可以调用methods调整效果

```js
const renderer = new THREE.WebGLRenderer({  //create the WebGLRenderer with an empty objec
    canvas: canvas      //create a property called canvas, and fetch canvas 
})
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
```


## How to run the three.js locally

run `$ npm install` only once
When we start coding, we should execute `$ npm run dev`. It will automatically open a browser window.
Press `Ctrl+C` to stop the server.
We can build a website with `$ npm run build`. After running this command, there will appear a folder called `dist`. Put this folder online, we will have our website.

## More about the Webpack template

There are a few things you need to know about the Webpack template before we continue:

You need to run `npm install` only once.
You have to do `npm run dev` each time you want to run the server and start coding. Your terminal might seem stuck, but it's perfectly normal, and it means that the server is running.
Press `CTRL + C` to stop the server. You might need to press the shortcut multiple times on Windows or confirm with the letter `o`.
If you want to build your website to deploy it online, you can run `npm run build`. The final files will appear in the `/dist/` folder.
You can find the `index.html` file in the `/src/` folder (you don't need to add the `<script>` manually. Webpack will add it automatically).
The `script.js` file is also in the `/src/` folder.
You can load the `style.css` file from the `script.js` file. It might seem strange, but that's how modules in Webpack work.
Making a syntax mistake will usually result in an error visible directly on the page with the concerned line.
The page will automatically refresh as you save any of those files.
You can put "static files" in the `static/` folder. Those files will be accessible by typing the URL of the local server, followed by the path to the file (starting from the `static/` folder). We'll use this to load textures and models laters.
The only folders you need to go into are the `src/` and the `static/` folders.
You can access your local server from any other device on the same network by typing the same URL that opened in your browser (which is very useful if you want to debug on mobile).
If you make a mistake and the page reloads as a white page, you might need to refresh the page manually once you fixed the error.

## Device access
`$ npm run dev`生成的ip允许任何在同一Wi-Fi下的设备访问

## Get our scene back

Here's the easy part. We want to get our scene back in this Webpack template.

First, you need to add the `<canvas>` to the `src/index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>04 - Webpack</title>
</head>
<body>
    <canvas class="webgl"></canvas>
</body>
</html>
```

Remember that you don't need to add any `<script>`. Webpack will handle this part.

Now you need to add your JavaScript code to the `/src/script.js` file. The only differences are the two first lines.

`import './style.css'` will import the CSS and apply it to the page (the CSS file is currently empty).
`import * as THREE from 'three'` will import all default classes of Three.js inside the `THREE` variable. We can customize the name of variable, like THREE, T etc.
The three module is in the `/node_modules/` folder, but you don't need to touch it.

```js
import './style.css'
import * as THREE from 'three'

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('canvas.webgl')
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
```

If the server was already running, open the page (no need to refresh).

If not, run npm run dev from the terminal, and the page should open.

>Q: How to use Webpack? How to initialize it?
`$ npm install --save-dev webpack webpack-cli`
in json file, add `"build": "webpack"` in `"scripts": {}`

>Q: What does querySelector('canvas.webgl') function? It will get the canvas element created in html file? 

## 渲染顺序

`.render()`是需要放在所有语句之后。它只渲染在其之前的语句。JS是thread-based顺序执行，不是concurrency model。

## Vector

`mesh.position.normalize()` take the length of the vestor of the object to 1
`mesh.position.distanceTo(camera.position)` return the distance between mesh and camera
`mesh.position.set(0.7, -0.6, 1)` set the position of the object
`mesh.scale.set(2,0.5,0.5)` scale the object
`mesh.rotation.y = Math.PI` rotate the object. can use Math.PI as an exact value.
`mesh.roatation.reorder('YXZ')` you can change rotation order by using the reorder() method. Do it before changing the rotation.

`const axesHelper = new THREE.AxesHelper()` The AxesHelper will display 3 lines corresponding to the x, y and z axes, each one starting at the center of the scene and going in the corresponding direction.调用三维坐标系用作视觉参考，别忘了添加到场景里`scene.add(axesHelper)`


`camera.lookAt(mesh.position)`  相机指向的坐标点
`camera.lookAt(new THREE.Vector3(x,y,z))`  相机指向的坐标点
>Vector3
Class representing a 3D vector. A 3D vector is an ordered triplet of numbers (labeled x, y, and z), which can be used to represent a number of things, such as:
    A point in 3D space.
    A direction and length in 3D space. In three.js the length will always be the Euclidean distance (straight-line distance) from (0, 0, 0) to (x, y, z) and the direction is also measured from (0, 0, 0) towards (x, y, z).
    Any arbitrary ordered triplet of numbers.
There are other things a 3D vector can be used to represent, such as momentum vectors and so on, however these are the most common uses in three.js.

Iterating through a Vector3 instance will yield its components (x, y, z) in the corresponding order.

## Group

At some point, you might want to group things. Let's say you are building a house with walls, doors, windows, a roof, bushes, etc.

When you think you're done, you become aware that the house is too small, and you have to re-scale each object and update their positions.

A good alternative would be to group all those objects into a container and scale that container.

You can do that with the Group class.

Instantiate a Group and add it to the scene. Now, when you want to create a new object, you can add it to the Group you just created using the add(...) method rather than adding it directly to the scene

Because the Group class inherits from the Object3D class, it has access to the previously-mentioned properties and methods like position, scale, rotation, quaternion, and lookAt.

Comment the lookAt(...) call and, instead of our previously created cube, create 3 cubes and add them to a Group. Then apply transformations on the group:

```js
/**
 * Objects
 */
const group = new THREE.Group()
group.scale.y = 2
group.rotation.y = 0.2
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube1.position.x = - 1.5
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube2.position.x = 0
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube3.position.x = 1.5
group.add(cube3)
```