import React, { useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { WaterMaterial } from "@babylonjs/materials";

const BunnyPage: React.FC = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true);

    const createScene = function () {
      const scene = new BABYLON.Scene(engine);
      const camera = new BABYLON.ArcRotateCamera(
        "Camera",
        Math.PI / 2,
        Math.PI / 2,
        2,
        BABYLON.Vector3.Zero(),
        scene
      );
      camera.attachControl(canvas, true);

      const light1 = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(1, 1, 0),
        scene
      );

      BABYLON.SceneLoader.ImportMesh(
        "",
        "/",
        "Stanford_Bunny.stl",
        scene,
        function (newMeshes) {
          const bunny = newMeshes[0];
          bunny.position.y = -0.5; // Adjust the position of the bunny to be above the water surface

          const gizmoManager = new BABYLON.GizmoManager(scene);
          gizmoManager.boundingBoxGizmoEnabled = true;
          gizmoManager.attachToMesh(bunny);
        }
      );

      // Create a simple water material
      const waterMaterial = new WaterMaterial(
        "waterMaterial",
        scene,
        new BABYLON.Vector2(1024, 1024)
      );
      waterMaterial.backFaceCulling = true;
      waterMaterial.bumpTexture = new BABYLON.Texture(
        "/public/textures/waterbump.png",
        scene
      );
      waterMaterial.windForce = -10;
      waterMaterial.waveHeight = 0.5;
      waterMaterial.bumpHeight = 0.1;
      waterMaterial.waveLength = 0.1;
      waterMaterial.waveSpeed = 50.0;

      // Create the water mesh
      const waterMesh = BABYLON.Mesh.CreateGround(
        "waterMesh",
        60,
        60,
        32,
        scene,
        false
      );
      waterMesh.material = waterMaterial;

      return scene;
    };

    const scene = createScene();

    engine.runRenderLoop(function () {
      scene.render();
    });

    return () => {
      engine.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100vh" }} />;
};

export default BunnyPage;
