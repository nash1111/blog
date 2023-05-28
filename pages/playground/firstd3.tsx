import * as natural from "natural";
import { TfIdf } from "natural";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface SimilarityResult {
  pair: [string, string]; // 文書IDのペア
  similarity: number; // 類似度
}

type MyNode = d3.SimulationNodeDatum & {
  id: string;
  attribute: string;
  content: string;
};

const FirstD3: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 500;
    const radius = 5;

    const nodes: MyNode[] = [
      { id: "1", attribute: "a", content: "Rust is very good language" },
      { id: "2", attribute: "a", content: "Rust is good" },
      { id: "3", attribute: "b", content: "Python might be good" },
      { id: "4", attribute: "b", content: "Python is shit" },
      { id: "5", attribute: "b", content: "Python is awful" },
      { id: "6", attribute: "b", content: "Python is nothing but bullshit" },
      { id: "7", attribute: "c", content: "Never use Python" },
      {
        id: "8",
        attribute: "c",
        content: "just make cargo like tool in Python",
      },
      { id: "9", attribute: "c", content: "fuck python" },
    ];

    const links: d3.SimulationLinkDatum<MyNode>[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].attribute === nodes[j].attribute) {
          links.push({ source: nodes[i], target: nodes[j] });
        }
      }
    }

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const boundingBoxForce = (alpha: number) => {
      for (let d of nodes) {
        d.x = Math.max(radius, Math.min(width - radius, d.x!));
        d.y = Math.max(radius, Math.min(height - radius, d.y!));
      }
    };

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink<MyNode, d3.SimulationLinkDatum<MyNode>>(links)
          .id((d) => d.id)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("boundary", boundingBoxForce);

    const link = svg
      .selectAll(".link")
      .data(links)
      .join("line")
      .classed("link", true)
      .style("stroke", "black");

    const drag = d3
      .drag<SVGCircleElement, MyNode>()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        event.sourceEvent.preventDefault(); // 追加
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    const node = svg
      .selectAll<SVGCircleElement, MyNode>(".node")
      .data(nodes)
      .join("circle")
      .attr("r", radius)
      .style("fill", (d) => colorScale(d.attribute))
      .attr("cx", () => Math.random() * width)
      .attr("cy", () => Math.random() * height)
      .call(drag as any); // TypeScriptの型チェックを回避

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "#ddd") // change this to light grey
      .style("color", "black")
      .style("padding", "8px")
      .style("border-radius", "6px")
      .style("border", "1px solid black");

    node
      .on("mouseover", function (event, d) {
        tooltip.text(d.content).style("visibility", "visible"); // update the tooltip text
      })
      .on("mouseout", function () {
        tooltip.style("visibility", "hidden");
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", d3.pointer(event)[1] - 10 + "px")
          .style("left", d3.pointer(event)[0] + 10 + "px");
      });

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as MyNode).x!)
        .attr("y1", (d) => (d.source as MyNode).y!)
        .attr("x2", (d) => (d.target as MyNode).x!)
        .attr("y2", (d) => (d.target as MyNode).y!);

      node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);
    });

    const oscillation = () => {
      for (let node of nodes) {
        node.x! += (Math.random() - 0.5) / 50;
        node.y! += (Math.random() - 0.5) / 50;
      }
      // ここでノードの位置を更新
      node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);
    };

    setInterval(oscillation, 50);
  }, []);

  return <svg ref={svgRef} style={{ width: "500px", height: "500px" }} />;
};

export default FirstD3;
