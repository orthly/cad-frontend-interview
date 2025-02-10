import React from "react";
import * as THREE from "three";

import { useScene } from "./utils/useScene";

type TResponseData = {
  position: number[];
  normal: number[];
};

export default function App() {
  // START PROVIDED CODE
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const sceneRef = useScene(canvasRef);
  // END PROVIDED CODE

  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<TResponseData>(null);

  React.useEffect(() => {
    async function get() {
      const res = await fetch("http://localhost:4000/api");
      const data: TResponseData = await res.json();

      setData(data);
      setLoading(false);
    }

    get();
  }, []);

  React.useEffect(() => {
    if (data) {
      const positionArr = new Float32Array(data.position);
      const normalArr = new Float32Array(data.normal);

      const geomAttr = new THREE.BufferAttribute(positionArr, 3);
      const normAttr = new THREE.BufferAttribute(normalArr, 3);

      const geom = new THREE.BufferGeometry();
      geom.setAttribute("position", geomAttr);
      geom.setAttribute("normal", normAttr);

      const mat = new THREE.MeshStandardMaterial({ color: 0x003a30 });

      const bunny = new THREE.Mesh(geom, mat);
      bunny.rotation.copy(new THREE.Euler(-Math.PI / 2, 0, 0));

      sceneRef.current.add(bunny);

      const ambientLight = new THREE.AmbientLight();
      sceneRef.current.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight();
      sceneRef.current.add(directionalLight);
    }
  }, [data]);

  // START PROVIDED CODE
  return (
    <main>
      {loading ? <div className="dot" /> : null}
      {/** DO NOT REMOVE THE CANVAS */}
      <canvas ref={canvasRef} />
    </main>
  );
  // END PROVIDED CODE
}
