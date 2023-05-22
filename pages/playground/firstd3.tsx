import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const FirstD3: React.FC = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const svg = d3.select(svgRef.current);

    // Set up force simulation
    const nodes = [
      { id: "1", attribute: "a" },
      { id: "2", attribute: "a" },
      { id: "3", attribute: "a" },
      { id: "4", attribute: "b" },
      { id: "5", attribute: "b" },
      { id: "6", attribute: "b" },
      { id: "7", attribute: "c" },
      { id: "8", attribute: "c" },
      { id: "9", attribute: "c" },
    ];

    const links = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].attribute === nodes[j].attribute) {
          links.push({ source: nodes[i].id, target: nodes[j].id });
        }
      }
    }

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(500 / 2, 500 / 2));

    const link = svg
      .selectAll(".link")
      .data(links)
      .enter()
      .append("line")
      .classed("link", true);

    const node = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("circle")
      .classed("node", true)
      .attr("r", 5);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });
  }, []);

  return <svg ref={svgRef} style={{ width: "100%", height: "500px" }} />;
};

export default FirstD3;
