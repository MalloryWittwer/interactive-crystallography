import React, { Component } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";

function CubeBody(props) {
  return (
    <mesh position={[0, 0, 0]} scale={[1, 1, 1]} rotation={props.rotation}>
      <boxBufferGeometry args={[3, 3, 3]} widthSegments={3} />
      <meshStandardMaterial 
        // wireframe
        // transparent
        // color={"#000000"}
        color={props.color}
        // opacity={0.5}
      />
    </mesh>
  );
}

class Cube extends Component {
  render() {
    return (
      <Canvas height={300}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 10, 0]} intensity={1.0} />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={0.5} />
        <OrthographicCamera
          makeDefault
          position={this.props.cameraPos}
          rotation={this.props.cameraRot}
          zoom={60}
        />
        <CubeBody rotation={this.props.rotation} color={this.props.color}/>
      </Canvas>
    );
  }
}

export default Cube;
