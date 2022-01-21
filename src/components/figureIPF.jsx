import React, { Component } from "react";
import * as d3 from "d3";

const margin = { top: 0, right: 0, bottom: 30, left: 35 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

const x = d3.scaleLinear().domain([0, 0.45]).range([0, width]);
const y = d3.scaleLinear().domain([0, 0.45]).range([height, 0]);

class Figure extends Component {
  constructor(props) {
    super(props);

    this.state = {
      svg: null,
    };
  }

  createFigure() {
    const svg = d3
      .select("#figure")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g").attr("transform", "translate(0," + height + ")");

    // FILL PLOT OUTLINE
    const coords = [[0, 0]];
    for (let i = 0; i <= 15; i++) {
      const irad = (i * Math.PI) / 180.0;
      coords.push([
        Math.sqrt(2) * Math.cos(irad) - 1.0,
        Math.sqrt(2) * Math.sin(irad),
      ]);
    }
    coords.push([0, 0]);

    svg
      .append("path")
      .datum(coords)
      .attr("fill", "#222222")
      .attr("stroke", "#aaaaaa")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(d[0]);
          })
          .y(function (d) {
            return y(d[1]);
          })
      );

    // Figure title
    svg
      .append("text")
      .attr("x", 0.5 * width)
      .attr("y", height)
      .attr("dy", 25)
      .text("Inverse Pole Figure")
      .style("text-anchor", "middle")
      .style("fill", "#aaaaaa");

    // 100 label
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", height)
      .attr("dx", -20)
      .attr("dy", 15)
      .text("100")
      .style("fill", "#aaaaaa");

    // 110 label
    svg
      .append("text")
      .attr("x", width)
      .attr("y", height)
      .attr("dx", -40)
      .attr("dy", 15)
      .text("110")
      .style("fill", "#aaaaaa");

    // 111 label
    svg
      .append("text")
      .attr("x", 0.75 * width)
      .attr("y", 0.15 * height)
      .attr("dx", 10)
      .attr("dy", 8)
      .text("111")
      .style("fill", "#aaaaaa");

    this.setState({
      svg: svg,
    });
  }

  updateFigure() {
    const { point, color } = this.props;
    const { svg } = this.state;

    const red = Number.parseInt(color[0] * 255, 10);
    const green = Number.parseInt(color[1] * 255, 10);
    const blue = Number.parseInt(color[2] * 255, 10);

    svg.selectAll("circle").remove();

    svg
      .append("g")
      .selectAll("dot")
      .data(point)
      .enter()
      .append("circle")
      .attr("cx", x(point[0]))
      .attr("cy", y(point[1]))
      .attr("r", 8)
      // .attr("stroke", "#aaaaaa")
      // .attr("stroke-width", 1.5)
      .style("fill", `rgb(${red}, ${green}, ${blue})`);
  }

  componentDidMount() {
    this.createFigure();
  }

  componentDidUpdate() {
    this.updateFigure();
  }

  render() {
    return <div id="figure"></div>;
  }
}

export default Figure;
