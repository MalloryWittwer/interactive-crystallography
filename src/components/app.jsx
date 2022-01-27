import React, { Component } from "react";
import Slider from "./slider";
import DirectionSelector from "./directionSelector";
import FigureIPF from "./figureIPF";
import Cube from "./cube3D";

import { vectorProject, computeVectors, colorize } from "../helpers/utils";

let pt, col, axisFile;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eulers: [0, 0, 0],
      direction: "z",
      point: [],
      color: null,
      axisFile: "axisZ.svg",
      cameraPos: [0, 0, 100],
      cameraRot: [0, 0, 0],
      nodes: null,
    };
  }

  updateE0 = (e0) => {
    const newEulers = [
      (e0 * Math.PI) / 180,
      this.state.eulers[1],
      this.state.eulers[2],
    ];
    const [xv, yv, zv] = computeVectors(newEulers);
    switch (this.state.direction) {
      case "z":
        pt = vectorProject(zv);
        col = colorize(zv);
        break;
      case "y":
        pt = vectorProject(yv);
        col = colorize(yv);
        break;
      case "x":
        pt = vectorProject(xv);
        col = colorize(xv);
        break;
      default:
        pt = vectorProject(zv);
        col = colorize(zv);
    }
    this.setState({
      eulers: newEulers,
      point: pt,
      color: col,
    });
  };

  updateE1 = (e1) => {
    const newEulers = [
      this.state.eulers[0],
      (e1 * Math.PI) / 180,
      this.state.eulers[2],
    ];
    const [xv, yv, zv] = computeVectors(newEulers);
    switch (this.state.direction) {
      case "z":
        pt = vectorProject(zv);
        col = colorize(zv);
        break;
      case "y":
        pt = vectorProject(yv);
        col = colorize(yv);
        break;
      case "x":
        pt = vectorProject(xv);
        col = colorize(xv);
        break;
      default:
        pt = vectorProject(zv);
        col = colorize(zv);
    }
    this.setState({
      eulers: newEulers,
      point: pt,
      color: col,
    });
  };

  updateE2 = (e2) => {
    const newEulers = [
      this.state.eulers[0],
      this.state.eulers[1],
      (e2 * Math.PI) / 180,
    ];
    const [xv, yv, zv] = computeVectors(newEulers);
    switch (this.state.direction) {
      case "z":
        pt = vectorProject(zv);
        col = colorize(zv);
        break;
      case "y":
        pt = vectorProject(yv);
        col = colorize(yv);
        break;
      case "x":
        pt = vectorProject(xv);
        col = colorize(xv);
        break;
      default:
        pt = vectorProject(zv);
        col = colorize(zv);
    }
    this.setState({
      eulers: newEulers,
      point: pt,
      color: col,
    });
  };

  getCameraPos(direction) {
    switch (direction) {
      case "z":
        return [0, 0, 100];
      case "y":
        return [0, 100, 0];
      case "x":
        return [100, 0, 0];
      default:
        return [0, 0, 100];
    }
  }

  getCameraRot(direction) {
    switch (direction) {
      case "z":
        return [0, 0, 0];
      case "y":
        return [(-1 * Math.PI) / 2, 0, 0];
      case "x":
        return [0, Math.PI / 2, 0];
      default:
        return [0, 0, 0];
    }
  }

  updateDirection = (newDir) => {
    const [xv, yv, zv] = computeVectors(this.state.eulers);
    switch (newDir) {
      case "z":
        axisFile = process.env.PUBLIC_URL + "/axisZ.svg";
        pt = vectorProject(zv);
        col = colorize(zv);
        break;
      case "y":
        axisFile = process.env.PUBLIC_URL + "/axisY.svg";
        pt = vectorProject(yv);
        col = colorize(yv);
        break;
      case "x":
        axisFile = process.env.PUBLIC_URL + "/axisX.svg";
        pt = vectorProject(xv);
        col = colorize(xv);
        break;
      default:
        axisFile = process.env.PUBLIC_URL + "/axisZ.svg";
        pt = vectorProject(zv);
        col = colorize(zv);
    }
    this.setState({
      direction: newDir,
      axisFile: axisFile,
      cameraPos: this.getCameraPos(newDir),
      cameraRot: this.getCameraRot(newDir),
      point: pt,
      color: col,
    });
  };

  componentDidMount = () => {
    this.updateDirection("z");
  };

  render() {
    return (
      <div className="app">
        <div className="app-wrapper">
          <div className="controls">
            <div className="intro-controls">
              <div className="intro">
                <h3>Crystal orientation visualizer</h3>
                <p>
                  Use the controls below to rotate the cubic unit cell and
                  select a projection axis. The crystal's orientation, displayed
                  in the Inverse Pole Figure (IPF), is color-coded according to
                  the Miller indices of the plane facing the selected axis.{" "}
                </p>
              </div>
              <div className="controls-wrapper">
                <DirectionSelector
                  label="Axis:"
                  actionFnct={this.updateDirection}
                />
                <Slider
                  label="X rot."
                  actionFnct={this.updateE0}
                  max="90"
                  id="slider-e0"
                />
                <Slider
                  label="Y rot."
                  actionFnct={this.updateE1}
                  max="90"
                  id="slider-e1"
                />
                <Slider
                  label="Z rot."
                  actionFnct={this.updateE2}
                  max="90"
                  id="slider-e2"
                />
              </div>
            </div>
            <div className="copyrights">
              <p>By Mallory Wittwer, 2022</p>
              <a href="https://github.com/MalloryWittwer/interactive-crystallography">
                View code
              </a>
            </div>
          </div>
          <div className="display-container">
            <div className="cube-container">
              <Cube
                id="cube"
                rotation={this.state.eulers}
                cameraPos={this.state.cameraPos}
                cameraRot={this.state.cameraRot}
                color={this.state.color}
              />
              <img
                src={this.state.axisFile}
                alt="Reference axis"
                className="axis"
              />
            </div>
            <FigureIPF point={this.state.point} color={this.state.color} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
