import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

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
      { id: "1", attribute: "a", content: "Node 1" },
      { id: "2", attribute: "a", content: "Node 2" },
      { id: "3", attribute: "a", content: "Node 3" },
      { id: "4", attribute: "b", content: "Node 4" },
      { id: "5", attribute: "b", content: "Node 5" },
      { id: "6", attribute: "b", content: "Node 6" },
      { id: "7", attribute: "c", content: "Node 7" },
      { id: "8", attribute: "c", content: "Node 8" },
      { id: "9", attribute: "d", content: "Node 9" },
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

    const node = svg
      .selectAll(".node")
      .data(nodes)
      .join("circle")
      .classed("node", true)
      .attr("r", radius)
      .style("fill", (d) => colorScale(d.attribute))
      .attr("cx", () => Math.random() * width)
      .attr("cy", () => Math.random() * height);

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background", "white") // change this to white
      .style("color", "black") // change this to black
      .style("padding", "8px")
      .style("border-radius", "6px")
      .style("border", "1px solid black") // this will add a black border
      .text("A");

    node
      .on("mouseover", function (d, i) {
        tooltip.style("visibility", "visible").text(d.content);
      })
      .on("mouseout", function () {
        tooltip.style("visibility", "hidden");
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", event.pageY - 10 + "px")
          .style("left", event.pageX + 10 + "px");
      });

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as MyNode).x!)
        .attr("y1", (d) => (d.source as MyNode).y!)
        .attr("x2", (d) => (d.target as MyNode).x!)
        .attr("y2", (d) => (d.target as MyNode).y!);

      node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);
    });

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as MyNode).x!)
        .attr("y1", (d) => (d.source as MyNode).y!)
        .attr("x2", (d) => (d.target as MyNode).x!)
        .attr("y2", (d) => (d.target as MyNode).y!);

      node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);
    });
  }, []);

  return <svg ref={svgRef} style={{ width: "500px", height: "500px" }} />;
};

export default FirstD3;
