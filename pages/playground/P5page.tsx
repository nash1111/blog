import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import p5, { Color } from "p5";
const Sketch = dynamic(() => import("react-p5"), { ssr: false });

const P5page: React.FC = () => {
  const gridSize = 16;
  const cellSize = 25;
  const borderVisible = useRef(true);
  const [currentColor, setCurrentColor] = useState<string>("#ff0000");
  const [grid, setGrid] = useState<Color[][]>([]);
  const p5Ref = useRef<p5 | null>(null);

  const setup = (p5: p5, canvasParentRef: Element) => {
    p5Ref.current = p5;
    p5.createCanvas(gridSize * cellSize, gridSize * cellSize + 50).parent(
      canvasParentRef
    );
    p5.pixelDensity(1);
    let initialGrid: Color[][] = [];
    for (let i = 0; i < gridSize; i++) {
      let row: Color[] = [];
      for (let j = 0; j < gridSize; j++) {
        row.push(p5.color(255, 255, 255, 0));
      }
      initialGrid.push(row);
    }
    setGrid(initialGrid);
    p5.background(255);
  };

  const draw = (p5: p5) => {
    const color = p5.color(currentColor);

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        p5.fill(grid[j][i]);
        if (borderVisible.current) {
          p5.stroke(220);
        } else {
          p5.noStroke();
        }
        p5.rect(i * cellSize, j * cellSize, cellSize, cellSize);
      }
    }

    // display current color outside the grid
    p5.fill(color);
    p5.noStroke();
    p5.rect(0, gridSize * cellSize, p5.width, 50);
  };

  const mouseDragged = (p5: p5) => {
    let i = Math.floor(p5.mouseX / cellSize);
    let j = Math.floor(p5.mouseY / cellSize);
    if (i >= 0 && i < gridSize && j >= 0 && j < gridSize) {
      let newGrid = [...grid];
      newGrid[j][i] = p5.color(currentColor);
      setGrid(newGrid);
    }
  };

  const saveImage = () => {
    if (grid.length === 0) return;

    let p5Instance = p5Ref.current!;
    p5Instance.background(255, 255, 255, 0);
    let img = p5Instance.createGraphics(
      gridSize * cellSize,
      gridSize * cellSize
    );
    img.pixelDensity(1);

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        img.fill(grid[j][i]);
        img.noStroke();
        img.rect(i * cellSize, j * cellSize, cellSize, cellSize);
      }
    }

    p5Instance.save(img, "dot_painting.png");
  };

  const clearGrid = () => {
    let p5Instance = p5Ref.current!;
    p5Instance.background(255); // Clear the entire canvas
    let newGrid: Color[][] = [];
    for (let i = 0; i < gridSize; i++) {
      let row: Color[] = [];
      for (let j = 0; j < gridSize; j++) {
        row.push(p5Instance.color(255, 255, 255, 0)); // Use a new p5.Color instance for each cell
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  };

  const toggleBorders = () => {
    borderVisible.current = !borderVisible.current;
  };

  return (
    <div>
      <button onClick={saveImage}>Save</button>
      <button onClick={clearGrid}>Clear</button>
      <button onClick={toggleBorders}>Toggle Borders</button>
      <input
        type="color"
        value={currentColor}
        onChange={(e) => setCurrentColor(e.target.value)}
      />
      <Sketch setup={setup} draw={draw} mouseDragged={mouseDragged} />
    </div>
  );
};

export default P5page;
