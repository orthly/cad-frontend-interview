import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export function useScene(canvas: React.RefObject<HTMLCanvasElement | null>) {
  const sceneRef = React.useRef<THREE.Scene>(null);

  const cameraRef = React.useRef<THREE.PerspectiveCamera>(null);
  const rendererRef = React.useRef<THREE.WebGLRenderer>(null);
  const controlsRef = React.useRef<OrbitControls>(null);

  React.useLayoutEffect(() => {
    if (!sceneRef.current && !!canvas.current) {
      sceneRef.current = new THREE.Scene();

      const width = canvas.current.offsetWidth;
      const heigth = canvas.current.offsetHeight;

      // camera
      cameraRef.current = new THREE.PerspectiveCamera(
        50,
        width / heigth,
        0.1,
        1000,
      );
      cameraRef.current.position.set(100, 100, 100);

      // renderer
      rendererRef.current = new THREE.WebGLRenderer({
        canvas: canvas.current,
        antialias: true,
        alpha: true,
      });
      rendererRef.current.setSize(width, heigth);

      // controls
      controlsRef.current = new OrbitControls(
        cameraRef.current,
        canvas.current,
      );

      // base grid
      const gridHelper = new THREE.GridHelper(100, 10);
      sceneRef.current.add(gridHelper);

      animate();

      return () => {
        sceneRef.current = null;
      };
    }
  }, []);

  const animate = React.useCallback(() => {
    requestAnimationFrame(animate);

    if (
      controlsRef.current &&
      rendererRef.current &&
      sceneRef.current &&
      cameraRef.current
    ) {
      controlsRef.current?.update();
      rendererRef.current?.render(sceneRef.current!, cameraRef.current!);
    }
  }, []);

  return sceneRef as React.RefObject<THREE.Scene>;
}
