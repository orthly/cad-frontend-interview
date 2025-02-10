## To start the app
Run `npm run dev`

Navigate to `localhost:3000`

API endpoint is at `http:localhost:4000/api`

## Steps

### 1
Make an http request to the endpoint (`http:localhost:4000/api`) and get the data necessary to build a `THREE.Mesh`.
The response adheres to the TResponseData type
```
type TResponseData = {
  position: number[];
  normal: number[];
};
```

### 2
Inside the `position` attribute is a list of vertices, the first 3 numbers are the x,y,z coordinates of the first vertex, the second 3 of the second, and so on.
Inside the `normal` attribute is a list of vectors, the first 3 numbers are the x,y,z coordinates of the first vector, the second 3 of the second, and so on.

### 3
It will take some time for the api to respond with the data.
In the meantime, display a red dot in the center of the screen.
Do not delete the canvas, otherwise the scene will not load. Display the dot on top of it.

### 4
Once the request completes, display a mesh using the  retrieved from the endpoint in the scene.
The scene is provided by the `useScene` component, that returns a `React.RefObject<THREE.Scene>`.

### 5
Assign a Dandy green (#003a30) `THREE.MeshStandardMaterial` to the mesh.
Rotate the mesh to face upwards.
Add some lights to the scene to give it more depth.
