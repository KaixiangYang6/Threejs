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

**run `$ npm install` only once**
**When we start coding, we should execute `$ npm run dev`. It will automatically open a browser window.**
Press `Ctrl+C` to stop the server.
We can build a website with `$ npm run build`. After running this command, there will appear a folder called `dist`. Put this folder online, we will have our website.
每个文件夹都需要执行一次`$ npm install`，运行过后会有`node_mooudel/`。需要运行时，实行`npm run dev`。

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

**`import './style.css'` will import the CSS and apply it to the page (the CSS file is currently empty).**
**`import * as THREE from 'three'` will import all default classes of Three.js inside the `THREE` variable. We can customize the name of variable, like THREE, T etc.**
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

## Combining transformations
You can combine the position, the rotation (or quaternion), and the scale in any order. The result will be the same. It's equivalent to the state of the object.

Let's combine all the transformations we tried before:

```js
mesh.position.x = 0.7
mesh.position.y = - 0.6
mesh.position.z = 1
mesh.scale.x = 2
mesh.scale.y = 0.25
mesh.scale.z = 0.5
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25
```

## Group

At some point, you might want to group things. Let's say you are building a house with walls, doors, windows, a roof, bushes, etc.

When you think you're done, you become aware that the house is too small, and you have to re-scale each object and update their positions.

A good alternative would be to group all those objects into a container and scale that container.

You can do that with the Group class.

Instantiate a Group and add it to the scene. Now, when you want to create a new object, you can add it to the Group you just created using the `add(...)` method rather than adding it directly to the scene

Because the Group class inherits from the Object3D class, it has access to the previously-mentioned properties and methods like `position`, `scale`, `rotation`, `quaternion`, and `lookAt`.

Comment the `lookAt(...)` call and, instead of our previously created cube, create 3 cubes and add them to a Group. Then apply transformations on the `group`:

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

## Animation

The `window.requestAnimationFrame()` method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.

**`requestAnimationFrame` will execute the function you provide on the next frame. But then, if this function also uses `requestAnimationFrame` to execute that same function on the next frame, you'll end up with your function being executed on each frame forever which is exactly what we want.**
Create a function named `tick` and call this function once. In this function, use `window.requestAnimationFrame(...)` to call this same function on the next frame:
创建tick()，并在其中执行`window.requestAnimationFrame(...)`，括号里执行创建的`tick`，这样可以形成循环。注意外部还需要一个tick()。

```js
//Animation
const tick=()=>{
    console.log('tick')
    window.requestAnimationFrame(tick) 
}

tick()
```

>Q: What does `tick=()=>{}` mean? And what is the purpose of the `tick()` in the last line?
>A: `tick=()=>{}` equals `function

## Time

动画运动应该跟随现实世界的绝对时间，而不是计算机运动的帧速率。如果一帧旋转0.01，不同浏览器的帧速率不一样60帧率或者30帧率，那么旋转的速度将会是不一样的。如果计算两帧之间的时间，每过一份这个时间，旋转0.01，这样每秒旋转的路程是一样的。**虽然60帧的帧率是30帧的两倍，但60帧的`deltaTime`是30帧的二分之一，这样每秒走过的路程是一样的。**

```js
//Animate
let time = Date.now()

const tick = () =>
{
		// Time
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime

    // Update objects
    mesh.rotation.y += 0.01 * deltaTime

    // ...
}

tick()
```

## Clock

但实际不需要这样计算时间，可以使用Three.js内置的类`Clock`。计算从变量创建起过去了多长时间。

```js
//Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    mesh.rotation.y = elapsedTime

    // ...
}

tick()
```

## Use GSAP library

<https://greensock.com/docs/v3/GSAP/gsap.to()>

Sometimes you'll want to animate your scene in a very specific way that will require using another library. There are tons of animation libraries, but a very famous one is GSAP.

To add GSAP to our Webpack project, we can use the dependency manager provided with Node.js called `npm`.

In your terminal (while the server is not running or by using another terminal window on the same folder), run `npm install --save gsap@3.5.1`

The `--save` argument saves the dependency in the `package.json` so the module can be fetched if we do an `npm install`.

The `@3.5.1` forces the version. We use this version because it was the one used when writing the lesson, but you can try the latest version if you want by removing @3.5.1.

GSAP is now available in the `node_modules/` folder, and we can import it in our `script.js`:

```js
import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// ...
```

Comment the code related to the previous animations but keep the tick function with the render. Then you can create what we call a tween (an animation from A to B) using gsap.to(...):

```js
//Animate
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

const tick = () =>
{
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
```

GSAP has a built-in `requestAnimationFrame`, so **you don't need to update the animation by yourself**, but still, if you want to see the cube moving, you need to keep doing the renders of your scene on each frame.

## Camera

Camera
The Camera class is what we call an abstract class. You're not supposed to use it directly, but you can inherit from it to have access to common properties and methods. Some of the following classes inherit from the Camera class.

ArrayCamera
The ArrayCamera is used to render your scene multiple times by using multiple cameras. Each camera will render a specific area of the canvas. You can imagine this looking like old school console multiplayer games where we had to share a split-screen.

StereoCamera
The StereoCamera is used to render the scene through two cameras that mimic the eyes in order to create what we call a parallax effect that will lure your brain into thinking that there is depth. You must have the adequate equipment like a VR headset or red and blue glasses to see the result.

CubeCamera
The CubeCamera is used to get a render facing each direction (forward, backward, leftward, rightward, upward, and downward) to create a render of the surrounding. You can use it to create an environment map for reflection or a shadow map. We'll talk about those later.

**OrthographicCamera**
The OrthographicCamera is used to create orthographic renders of your scene without perspective. It's useful if you make an RTS game like Age of Empire. Elements will have the same size on the screen regardless of their distance from the camera.

**PerspectiveCamera**
The PerspectiveCamera is the one we already used and simulated a real-life camera with perspective.
As we saw earlier, the PerspectiveCamera class needs some parameters to be instantiated, but we didn't use all the possible parameters. Add the third and fourth parameters:

```js
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100) //焦距，纵横比例，最近可见距离，最远可见距离
```



## Aspect ratio
The second parameter is called aspect ratio and corresponds to the width divided by the height. While you might think that it's obviously the canvas width by the canvas height and Three.js should calculate it by itself, it's not always the case if you start using Three.js in very specific ways. But in our case, you can simply use the canvas width and the canvas height.

I recommend saving those values in an object because we are going to need them multiple times:

```js
const sizes = {
    width: 800,
    height: 600
}
```

## Moouse Corrdinates

What we want to do now is control the camera with our mouse. First of all, we want to know the mouse coordinates. We can do that using native JavaScript by listening to the `mousemove` event with `addEventListener`.

The coordinates will be located in the argument of the callback function as `event.clientX` and `event.clientY`:

```js
// Cursor
window.addEventListener('mousemove', (event) =>
{
    console.log(event.clientX, event.clientY)
})
```

>Q: What is the meaning of `window.addEventListener('mousemove', (event) =>{}` ?

## 调用node_modules的文件

无需从node_modules开始写地址

```js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js' 
```

## Camera

```js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js' //调用库
const controls = new OrbitControls(camera, canvas)  //创建对象，注意第二个参数需要填写DOMelement.
```

### OrbitControls 

#### Constructor

OrbitControls( object : Camera, domElement : HTMLDOMElement )
`object`: (required) The camera to be controlled. The camera must not be a child of another object, unless that object is the scene itself.

`domElement`: The HTML element used for event listeners.
>Q: How does domElement work there??? What are the differences between `canvas` and `renderer.domElement`?

#### Properties

`.autoRotate` : Boolean
Set to true to automatically rotate around the target.
Note that if this is enabled, you must call .update () in your animation loop.

`.autoRotateSpeed` : Float
How fast to rotate around the target if .autoRotate is true. Default is 2.0, which equates to 30 seconds per orbit at 60fps.
Note that if .autoRotate is enabled, you must call .update () in your animation loop.

`.dampingFactor` : Float
The damping inertia used if .enableDamping is set to true.
Note that for this to work, you must call .update () in your animation loop.  0.05 may be the default value

`.enableDamping` : Boolean
Set to true to enable damping (inertia), which can be used to give a sense of weight to the controls. Default is false.
Note that if this is enabled, you must call .update () in your animation loop.


## Resize

```js
const sizes = {
    width: window.innerWidth,   //根据页面尺寸设置画布大小
    height: window.innerHeight
}
```
编写CSS，进行页面设置
A good thing to do first would be to remove any type of `margin` or `padding` on all elements by using a wildcard `*`:

```css
*
{/*可以在CSS文件内，将页面边缘margin和内边距padding设置为0 */
    margin: 0;
    padding: 0;
}
```

Then, we can fix the canvas on the top left using its webgl class to select it:

```css
.webgl
{/*让画布居于左上角*/
    position: fixed;
    top: 0;
    left: 0;
}
```

You don't need to specify width or height on the canvas because Three.js is already taking care of that when you call the `renderer.setSize(...)` method.
This is a good opportunity to fix a small problem on our canvas. Maybe you've noticed a blue outline on it when drag and dropping. This mostly happens on latest versions of Chrome. To fix that, we can simply add an `outline: none;` on the `.webgl`:

```css
.webgl
{
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
}
```

If you want to remove any type of scrolling even on touch screens, you can add an `overflow: hidden` on both `html` and `body`:

```css
html,
body
{
    overflow: hidden;
}
```

## Handle resize

To resize the canvas, we first need to know when the window is being resized. To do so, you can listen to the `resize` event on window.

Add the `resize` listener

Now that we trigger a function when the window is being resized, we need to update few things in our code.

First, we must update the `sizes` variable:

Secondly, we must update the `camera` aspect ratio by changing its `aspect` property:

When you change camera properties like `aspect` you also need to update the projection matrix using camera.`updateProjectionMatrix()`. We will talk about matrices later:

Finally, we must update the `renderer`. Updating the renderer will automatically update the canvas width and height:

```js
window.addEventListener('resize',()=>{
    //update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera
    camera.aspect = sizes.width/sizes.height //reset the property of PerspectiveCamera
    camera.updateProjectionMatrix()//See the base Camera class for common properties. Note that after making changes to most of these properties you will have to call .updateProjectionMatrix for the changes to take effect.
    
    //update renderer
    renderer.setSize(sizes.width, sizes.height)
})
```

You can test the result by double-clicking anywhere to toggle the fullscreen mode. Unfortunately, this won't work on Safari

This browser is taking its time to support officially simple features like the fullscreen, and we need to use prefixed versions to make it work for `document.fullscreenElement`, `canvas.requestFullscreen`, and `document.exitFullscreen`:

```js
window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})
```