import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

import { useScene } from './utils/useScene';

type TResponseData = {
    position: number[];
    normal: number[];
};

function useLoadApiData() {
    const [data, setData] = useState<TResponseData | null>(null);
    // todo: error state?
    const [loading, setLoading] = useState(false);
    React.useEffect(() => {
        if (loading || !!data) {
            return;
        }
        setLoading(true);
        window.fetch('http://localhost:4000/api' ).then((response) => {
            response.json().then(data => setData(data));
        }).finally(() => {
            setLoading(false);
        });
    }, [data]);

    return { loading, data };
}

export default function App() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const sceneRef = useScene(canvasRef);
    const { loading, data } = useLoadApiData();
    const [color, setColor] = useState('#003a30');

    React.useEffect(() => {
        const scene = sceneRef.current;
        if (!scene || !data) {
            return;
        }
        const vertices = new Float32Array(data.position);
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

        const normals = new Float32Array(data.normal);
        geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
        const material = new THREE.MeshPhongMaterial({ color: color, shininess: 100 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = 'bunny';
        mesh.scale.set(0.4, 0.4, 0.4);
        mesh.position.set(0, -1, 0);
        scene.add(mesh);
        mesh.rotateX(-Math.PI / 2);
        
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 20 );
        scene.add( directionalLight );
        
    }, [data]);
    useEffect(() => {
        const scene = sceneRef.current;
        const mesh = scene.getObjectByName('bunny');
        // @ts-ignore
        mesh.material.color.set(color);
        if (mesh?.type === 'mesh') {
        }
    }, [color]);
    return (
        <main>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            {loading && (
                <div style={{
                    zIndex: 1000,
                    position: 'fixed',
                    left: 'calc(50vw - 10px)',
                    top: 'calc(50vh - 10px)',
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'red',
                    borderRadius: '50%'
                }}/>
            )}
            {/** DO NOT REMOVE THE CANVAS, ADD THE ELEMENT ON TOP */}
            <canvas ref={canvasRef}/>
        </main>
    );
}
