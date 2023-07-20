import React, { useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { WaterMaterial } from "@babylonjs/materials";

const BunnyWithMirror: React.FC = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new BABYLON.Engine(canvas, true);

    const createScene = function () {
      const scene = new BABYLON.Scene(engine);
      const camera = new BABYLON.ArcRotateCamera(
        "Camera",
        (3 * Math.PI) / 2,
        Math.PI / 3, // カメラを少し下向きにする
        85, // カメラをターゲットから遠ざける
        BABYLON.Vector3.Zero(),
        scene
      );
      camera.attachControl(canvas, true);

      // Create a dynamic texture
      var dynamicTexture = new BABYLON.DynamicTexture(
        "dynamic texture",
        { width: 512, height: 512 },
        scene,
        false
      );

      // Get a 2D drawing context from the dynamic texture
      var ctx = dynamicTexture.getContext();

      // Draw a filled rectangle with a water color
      ctx.fillStyle = "aqua";
      ctx.fillRect(0, 0, 512, 512);

      // Update the dynamic texture
      dynamicTexture.update();

      const light1 = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(1, 1, 0),
        scene
      );

      // Create a simple water material
      const waterMaterial = new WaterMaterial(
        "waterMaterial",
        scene,
        new BABYLON.Vector2(1024, 1024)
      );
      waterMaterial.backFaceCulling = true;
      waterMaterial.bumpTexture = dynamicTexture;
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

      // 1. 鏡の材料を作成
      const mirrorTexture = new BABYLON.MirrorTexture(
        "mirror",
        1024,
        scene,
        true
      );
      mirrorTexture.mirrorPlane = new BABYLON.Plane(0, -1, 0, 0);

      const mirrorMaterial = new BABYLON.StandardMaterial(
        "mirrorMaterial",
        scene
      );
      mirrorMaterial.reflectionTexture = mirrorTexture;
      mirrorMaterial.reflectionTexture.level = 0.5;
      mirrorMaterial.reflectionTexture.coordinatesMode =
        BABYLON.Texture.PLANAR_MODE;

      // 2. 鏡のメッシュを作成
      const mirrorMesh = BABYLON.Mesh.CreatePlane("mirrorMesh", 60, scene);
      mirrorMesh.position.y = waterMesh.position.y + 0.01;
      mirrorMesh.rotation.x = 0;
      mirrorMesh.material = mirrorMaterial;

      BABYLON.SceneLoader.ImportMesh(
        "",
        "/",
        "Stanford_Bunny.stl",
        scene,
        function (newMeshes) {
          const bunny = newMeshes[0];

          bunny.position.y = -0.5; // Adjust the position of the bunny to be above the water surface
          bunny.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3); // Scale the bunny to half its size
          const gizmoManager = new BABYLON.GizmoManager(scene);
          gizmoManager.boundingBoxGizmoEnabled = true;
          gizmoManager.attachToMesh(bunny);

          // 鏡のテクスチャにウサギのメッシュを追加
          mirrorTexture.renderList?.push(bunny);
        }
      );

      // Create 4 particle systems
      const emitterPositions = [
        new BABYLON.Vector3(-5, 30, -5),
        new BABYLON.Vector3(5, 30, -5),
        new BABYLON.Vector3(-5, 30, 5),
        new BABYLON.Vector3(5, 30, 5),
      ];

      emitterPositions.forEach((position, i) => {
        var particleSystem = new BABYLON.ParticleSystem(
          `particles${i}`,
          5000,
          scene
        );

        // Texture of each particle
        particleSystem.particleTexture = dynamicTexture;

        // Where the particles come from
        particleSystem.emitter = position; // the starting object, the emitter

        // Direction of each particle after it has been emitted
        particleSystem.direction1 = new BABYLON.Vector3(-7, -8, 3);
        particleSystem.direction2 = new BABYLON.Vector3(7, -8, -3);

        // Colors of all particles
        particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
        particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
        particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

        // Size of each particle (random between...
        particleSystem.minSize = 0.1;
        particleSystem.maxSize = 0.5;

        // Life time of each particle (random between...
        particleSystem.minLifeTime = 0.3;
        particleSystem.maxLifeTime = 1.5;

        // Emission rate
        particleSystem.emitRate = 1500;

        // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

        // Set the gravity of all particles
        particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

        // Angular speed, in radians
        particleSystem.minAngularSpeed = 0;
        particleSystem.maxAngularSpeed = Math.PI;

        // Speed
        particleSystem.minEmitPower = 1;
        particleSystem.maxEmitPower = 3;
        particleSystem.updateSpeed = 0.005;

        // Start the particle system
        particleSystem.start();
      });

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

export default BunnyWithMirror;
