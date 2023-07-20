import React, { useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { WaterMaterial } from "@babylonjs/materials";

const BunnyWith3Mirrors: React.FC = () => {
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

      BABYLON.SceneLoader.ImportMesh(
        "",
        "/",
        "Stanford_Bunny.stl",
        scene,
        function (newMeshes) {
          const bunny = newMeshes[0];

          bunny.position.y = -0.5;
          bunny.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
          const gizmoManager = new BABYLON.GizmoManager(scene);
          gizmoManager.boundingBoxGizmoEnabled = true;
          gizmoManager.attachToMesh(bunny);

          // 3枚の鏡を作成してウサギを囲む
          const mirrorPositions = [
            new BABYLON.Vector3(0, bunny.position.y, 30),
            new BABYLON.Vector3(30, bunny.position.y, 0),
            new BABYLON.Vector3(-30, bunny.position.y, 0),
          ];
          const mirrorRotations = [0, Math.PI / 2, -Math.PI / 2];

          mirrorPositions.forEach((position, index) => {
            const mirrorTexture = new BABYLON.MirrorTexture(
              `mirror${index}`,
              1024,
              scene,
              true
            );
            mirrorTexture.mirrorPlane = new BABYLON.Plane(0, -1, 0, 0);
            mirrorTexture.renderList?.push(bunny);

            const mirrorMaterial = new BABYLON.StandardMaterial(
              `mirrorMaterial${index}`,
              scene
            );
            mirrorMaterial.reflectionTexture = mirrorTexture;
            mirrorMaterial.reflectionTexture.level = 0.5;
            mirrorMaterial.reflectionTexture.coordinatesMode =
              BABYLON.Texture.PLANAR_MODE;

            const mirrorMesh = BABYLON.Mesh.CreatePlane(
              `mirrorMesh${index}`,
              60,
              scene
            );
            mirrorMesh.position = position;
            mirrorMesh.rotation.y = mirrorRotations[index];
            mirrorMesh.material = mirrorMaterial;
          });
        }
      );

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

export default BunnyWith3Mirrors;
