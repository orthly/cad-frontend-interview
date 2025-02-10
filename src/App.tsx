import React from "react";
import * as THREE from "three";

import { useScene } from "./utils/useScene";

type TResponseData = {
  position: number[];
  normal: number[];
};

export default function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const sceneRef = useScene(canvasRef);

  return (
    <main>
      {/** DO NOT REMOVE THE CANVAS, ADD THE ELEMENT ON TOP */}
      <canvas ref={canvasRef} />
    </main>
  );
}
