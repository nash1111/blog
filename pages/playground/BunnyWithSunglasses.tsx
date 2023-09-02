import React, { useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { WaterMaterial } from "@babylonjs/materials";

const BunnyWithSunglasses: React.FC = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true);

    const createScene = function () {
      const scene = new BABYLON.Scene(engine);
      const camera = new BABYLON.ArcRotateCamera(
        "Camera",
        (3 * Math.PI) / 2,
        Math.PI / 3,
        85,
        BABYLON.Vector3.Zero(),
        scene
      );
      camera.attachControl(canvas, true);

      // Add light to the scene
      const light = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(0, 1, 0),
        scene
      );

      BABYLON.SceneLoader.ImportMesh(
        "",
        "/",
        "Stanford_Bunny.stl",
        scene,
        function (newMeshes) {
          const bunny = newMeshes[0];
          bunny.position.y = -0.5;
          bunny.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
          const gizmoManager = new BABYLON.GizmoManager(scene);
          gizmoManager.boundingBoxGizmoEnabled = true;
          gizmoManager.attachToMesh(bunny);
        }
      );

      BABYLON.SceneLoader.ImportMesh(
        "",
        "/",
        "Glasses_120mm.stl",
        scene,
        function (newMeshes) {
          const bunny = newMeshes[0];
          bunny.position.y = -0.5;
          bunny.scaling = new BABYLON.Vector3(0.09, 0.09, 0.09);
          const gizmoManager = new BABYLON.GizmoManager(scene);
          gizmoManager.boundingBoxGizmoEnabled = true;

          // スケーリングギズモを有効にする
          gizmoManager.scaleGizmoEnabled = true;

          // 回転ギズモを有効にする
          gizmoManager.rotationGizmoEnabled = true;

          gizmoManager.attachToMesh(bunny);
        }
      );

      // Skybox
      const skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
      const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
      skyboxMaterial.backFaceCulling = false;
      skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
        "/TropicalSunnyDay",
        scene
      );
      skyboxMaterial.reflectionTexture.coordinatesMode =
        BABYLON.Texture.SKYBOX_MODE;
      skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
      skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
      skyboxMaterial.disableLighting = true;
      skybox.material = skyboxMaterial;

      // Ground
      const groundMaterial = new BABYLON.StandardMaterial(
        "groundMaterial",
        scene
      );
      groundMaterial.diffuseTexture = new BABYLON.Texture("/ground.jpg", scene);
      const diffuseTexture = groundMaterial.diffuseTexture as BABYLON.Texture;
      diffuseTexture.uScale = diffuseTexture.vScale = 4;
      const ground = BABYLON.Mesh.CreateGround(
        "ground",
        512,
        512,
        32,
        scene,
        false
      );
      ground.position.y = -1;
      ground.material = groundMaterial;

      // Water
      const waterMesh = BABYLON.Mesh.CreateGround(
        "waterMesh",
        512,
        512,
        32,
        scene,
        false
      );
      const water = new WaterMaterial("water", scene);
      water.bumpTexture = new BABYLON.Texture("/waterbump.png", scene);
      water.windForce = -15;
      water.waveHeight = 1.3;
      water.windDirection = new BABYLON.Vector2(1, 1);
      water.waterColor = new BABYLON.Color3(0.1, 0.1, 0.6);
      water.colorBlendFactor = 0.3;
      water.bumpHeight = 0.1;
      water.waveLength = 0.1;
      water.alpha = 0.7;
      water.addToRenderList(skybox);
      water.addToRenderList(ground);
      waterMesh.material = water;

      return scene;
    };

    const scene = createScene();
    scene.clearColor = new BABYLON.Color4(0.5, 0.5, 0.8, 1);

    engine.runRenderLoop(function () {
      scene.render();
    });

    return () => {
      engine.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100vh" }} />;
};

export default BunnyWithSunglasses;
