import { create, all, max } from "mathjs";

const math = create(all, {});

function colorize(indeces) {
  const a = Math.abs(indeces[2] - indeces[1]);
  const b = Math.abs(indeces[1] - indeces[0]);
  const c = indeces[0];
  const max = Math.max(a, b, c);
  const rgb = [a / max, b / max, c / max];
  return rgb;
}

function vectorProject(vect) {
  const theZ = Math.atan2(vect[1], vect[0]);
  const rZ = Math.sin(Math.acos(vect[2])) / (1 + Math.acos(Math.cos(vect[2])));
  const xesPreds = rZ * Math.cos(theZ);
  const yesPreds = rZ * Math.sin(theZ);
  const coords = [yesPreds, xesPreds];
  return coords;
}

function processVector(vect) {
  let x = vect.map((x) => Math.abs(x));
  const norm = math.norm(x);
  x = x.map((x) => x / norm);
  x = x.sort();
  return x;
}

function computeVectors(eulers) {
  const i1 = eulers[0] + 0.0001;
  const i2 = eulers[1] + 0.0001;
  const i3 = eulers[2] + 0.0001;
  const i1c = Math.cos(i1);
  const i1s = Math.sin(i1);
  const i2c = Math.cos(i2);
  const i2s = Math.sin(i2);
  const i3c = Math.cos(i3);
  const i3s = Math.sin(i3);

  const x00 = i2c * i3c;
  const x01 = -i2c * i3s;
  const x02 = i2s;
  const x10 = i1c * i3s + i3c * i1s * i2s;
  const x11 = i1c * i3c - i1s * i2s * i3s;
  const x12 = -i2c * i1s;
  const x20 = i1s * i3s - i1c * i3c * i2s;
  const x21 = i3c * i1s + i1c * i2s * i3s;
  const x22 = i1c * i2c;

  let rotMat = [
    [x00, x01, x02],
    [x10, x11, x12],
    [x20, x21, x22],
  ];

  rotMat = math.transpose(rotMat);
  rotMat = math.inv(rotMat);

  const rm0 = rotMat[0];
  const rm1 = rotMat[1];
  const rm2 = rotMat[2];

  const xv = processVector(rm0);
  const yv = processVector(rm1);
  const zv = processVector(rm2);

  return [xv, yv, zv];
}

export { vectorProject, computeVectors, colorize };
