import { BufferGeometry, Float32BufferAttribute, MathUtils, Mesh, PlaneGeometry, Points, PointsMaterial } from 'three';

import { particle } from '../../textures';

interface PlaneSize {
  width: number;
  height: number;
  depth: number;
}

export class SnowClass {
  private size = 0.05;
  private map = particle;
  private speed = 0.001;
  private material = new PointsMaterial({ size: this.size, map: this.map, transparent: true });
  private geometry = new BufferGeometry();
  private vertices: Float32BufferAttribute;
  private planeSize: PlaneSize;

  public points = new Points(this.geometry, this.material);

  constructor(plane: Mesh<PlaneGeometry>, count = 1000) {
    this.planeSize = {
      width: plane.geometry.parameters.width,
      height: plane.geometry.parameters.height,
      depth: plane.geometry.parameters.height,
    };

    const vertices = [];

    for (let i = 0; i < count; i++) {
      const x = MathUtils.randFloatSpread(this.planeSize.width);
      const y = MathUtils.randFloatSpread(this.planeSize.height);
      const z = MathUtils.randFloatSpread(this.planeSize.height) + 1;

      vertices.push(x, y, z);
    }

    this.vertices = new Float32BufferAttribute(vertices, 3);
    this.geometry.setAttribute('position', this.vertices);

    this.points.layers.set(31);
  }

  public render() {
    const { array, itemSize } = this.vertices;

    for (let i = 0; i < array.length / itemSize; i++) {
      const width = this.planeSize.width / 2;
      const height = this.planeSize.height / 2;
      const depth = this.planeSize.depth / 2;

      const x = this.vertices.getX(i);
      const y = this.vertices.getY(i);
      const z = this.vertices.getZ(i);

      this.vertices.setX(i, x < -width ? width : x - this.speed);
      this.vertices.setY(i, y < -height ? height : y - this.speed);
      this.vertices.setZ(i, z < -depth ? depth : z - this.speed);
    }

    this.vertices.needsUpdate = true;
  }
}
