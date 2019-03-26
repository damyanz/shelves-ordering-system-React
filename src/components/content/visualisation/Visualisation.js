import React, { Component } from "react";
import * as THREE from "three";
import OrbitControls from "threejs-orbit-controls";
import _debounce from "lodash/debounce";
import "./visualisation.scss";
import ash from "../../../gfx/ash.jpg";
import beech from "../../../gfx/beech.jpg";
import oak from "../../../gfx/oak.jpg";

export default class Visualisation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#000000",
      isDragging: false,
      dimensions: this.props.dims,
      type: false,
      amount: this.props.amount,
      data: this.props.data,
      materials: this.props.materialsArr,
      img: [ash, beech, oak],
      rotation: true,
      fullScreen: false,
      mountWidth: 0,
      mountHeight: 0,
      aspect: 1.415
    };
  }

  resizeCanvas = () => {
    this.camera.aspect = this.state.aspect;
    this.camera.updateProjectionMatrix();

    if (!this.state.fullScreen && this.mount) {
      this.renderer.setSize(
        this.mount.clientWidth,
        this.mount.clientWidth / this.camera.aspect
      );
      this.setState({
        mountWidth: this.mount.clientWidth,
        mountHeight: this.mount.clientWidth / this.camera.aspect,
        aspect: 1.415
      });
    } else {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  };
  componentDidMount() {
    this.initThree();
    this.initListeners();
    //LISTENERS
  }
  initListeners = () => {
    this.mount.addEventListener("touchmove", e => {
      e.preventDefault();
    });

    document.addEventListener("fullscreenchange", () => {
      this.setState(prevState => ({
        fullScreen: !prevState.fullScreen
      }));
    });
    document.addEventListener("mozfullscreenchange", () => {
      this.setState(prevState => ({
        fullScreen: !prevState.fullScreen
      }));
    });
    document.addEventListener("webkitfullscreenchange", () => {
      this.setState(prevState => ({
        fullScreen: !prevState.fullScreen
      }));
    });
    document.addEventListener("msfullscreenchange", () => {
      this.setState(prevState => ({
        fullScreen: !prevState.fullScreen
      }));
    });
  };
  initThree = () => {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, 1.825, 1, 1000);
    this.camera.position.set(75, 40, 75);

    this.controls = new OrbitControls(this.camera, this.mount);
    this.controls.autoRotate = this.state.rotation;
    this.controls.minDistance = 50;
    this.controls.maxDistance = 220;
    this.controls.enablePan = false;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#ffffff");
    this.mount.appendChild(this.renderer.domElement);
    window.addEventListener(
      "resize",
      _debounce(() => this.resizeCanvas(this.state.aspect), 100)
    );

    this.imgTextures = [];

    this.state.img.map(item => {
      const texture = new THREE.TextureLoader().load(item);
      const material = new THREE.MeshBasicMaterial({
        map: texture
      });

      this.imgTextures.push(material);
      return null;
    });

    this.start();
    this.resizeCanvas(this.state.aspect);
    this.scene.add(this.createBox());
    this.camera.lookAt(this.allParts.position);
  };

  createBox = () => {
    this.allParts = new THREE.Group();
    const frameThickness = 2;
    let { w, d, h } = this.state.dimensions;

    const frameM = new THREE.MeshBasicMaterial({
      color: this.state.color
    });

    let textures = [];

    this.state.data.map(item => {
      let textureGroup = [];
      switch (item.typ) {
        case "drewno":
          item.rodzaje.map((child, j) => {
            textureGroup.push(this.imgTextures[j]);
            return null;
          });
          break;
        case "szkło":
          item.rodzaje.map(child => {
            const material = new THREE.MeshBasicMaterial({
              color: child.tekstura
            });
            material.transparent = true;
            material.opacity = 0.7;
            textureGroup.push(material);
            return null;
          });
          break;
        default:
          textureGroup.push([]);
          break;
      }
      textures.push(textureGroup);
      return null;
    });
    const createPlate = materialArr => {
      const plateGroup = new THREE.Group();

      const plateG = new THREE.BoxGeometry(
        w - 2 * frameThickness,
        0.5,
        d - 2 * frameThickness
      );
      const plateGb = new THREE.BufferGeometry().fromGeometry(plateG);
      const plateM = textures[materialArr[0]][materialArr[1]];
      const plate = new THREE.Mesh(plateGb, plateM);
      plate.position.y = 0.5;

      plateGroup.add(plate);

      let restG;

      parseInt(d) > parseInt(w)
        ? (restG = new THREE.BoxGeometry(3, 0.2, d))
        : (restG = new THREE.BoxGeometry(w, 0.2, 3));

      const restGb = new THREE.BufferGeometry().fromGeometry(restG);
      const rest = new THREE.Mesh(restGb, frameM);
      const restClone = rest.clone();

      if (parseInt(d) > parseInt(w)) {
        rest.position.x = -w / 2 + 2;
        restClone.position.x = w / 2 - 2;
      } else {
        rest.position.z = -d / 2 + 2;
        restClone.position.z = d / 2 - 2;
      }

      plateGroup.add(rest);
      plateGroup.add(restClone);

      return plateGroup;
    };
    const createShelf = (y, materialArr) => {
      this.shelfGroup = new THREE.Group();
      const frontFrameG = new THREE.BoxGeometry(
        w,
        frameThickness,
        frameThickness
      );
      const frontFrameGb = new THREE.BufferGeometry().fromGeometry(frontFrameG);

      const sideFrameG = new THREE.BoxGeometry(
        d,
        frameThickness,
        frameThickness
      );
      const sideFrameGb = new THREE.BufferGeometry().fromGeometry(sideFrameG);
      const frontFrame = new THREE.Mesh(frontFrameGb, frameM);
      const sideFrame = new THREE.Mesh(sideFrameGb, frameM);

      for (let i = 0; i < 4; i++) {
        if (i % 2 === 0) {
          const frontFrameClone = frontFrame.clone();
          frontFrameClone.rotateY(i * (Math.PI / 2));
          this.shelfGroup.add(frontFrameClone);
        } else {
          const sideFrameClone = sideFrame.clone();
          sideFrameClone.rotateY(i * (Math.PI / 2));
          this.shelfGroup.add(sideFrameClone);
        }
      }

      this.shelfGroup.children[0].position.setZ(d / 2 - 1);
      this.shelfGroup.children[1].position.setX(w / 2 - 1);
      this.shelfGroup.children[2].position.setZ(-d / 2 + 1);
      this.shelfGroup.children[3].position.setX(-w / 2 + 1);

      if (materialArr[0] !== null)
        this.shelfGroup.add(createPlate(materialArr));
      this.shelfGroup.position.setY(y);
      return this.shelfGroup;
    };

    const createColumns = () => {
      const columnGroup = new THREE.Group();
      const columnG = new THREE.BoxGeometry(frameThickness, h, frameThickness);
      const columnGb = new THREE.BufferGeometry().fromGeometry(columnG);
      const columnM = new THREE.MeshBasicMaterial({
        color: this.state.color
      });
      const column = new THREE.Mesh(columnGb, columnM);

      for (let i = 0; i < 4; i++) {
        const columnClone = column.clone();
        columnGroup.add(columnClone);
      }
      columnGroup.children[0].position.set(-w / 2 + 1, 0, d / 2 - 1);
      columnGroup.children[1].position.set(w / 2 - 1, 0, d / 2 - 1);
      columnGroup.children[2].position.set(w / 2 - 1, 0, -d / 2 + 1);
      columnGroup.children[3].position.set(-w / 2 + 1, 0, -d / 2 + 1);

      return columnGroup;
    };
    const createAxes = () => {
      const colors = {
        x: 0x890000,
        y: 0xfffc19,
        z: 0x0971b2
      };

      const lineGroup = new THREE.Group();
      const lineMx = new THREE.LineBasicMaterial({ color: colors.x });
      const lineGx = new THREE.Geometry();
      lineGx.vertices.push(new THREE.Vector3(-w / 2 - 2, -h / 2, d / 2 + 2));
      lineGx.vertices.push(new THREE.Vector3(w / 2, -h / 2, d / 2 + 2));
      let lineX = new THREE.Line(lineGx, lineMx);

      const lineMy = new THREE.LineBasicMaterial({ color: colors.y });
      const lineGy = new THREE.Geometry();
      lineGy.vertices.push(new THREE.Vector3(-w / 2 - 2, -h / 2, d / 2 + 2));
      lineGy.vertices.push(new THREE.Vector3(-w / 2 - 2, h / 2 + 2, d / 2 + 2));
      let lineY = new THREE.Line(lineGy, lineMy);

      const lineMz = new THREE.LineBasicMaterial({ color: colors.z });
      const lineGz = new THREE.Geometry();
      lineGz.vertices.push(new THREE.Vector3(-w / 2 - 2, -h / 2, d / 2 + 2));
      lineGz.vertices.push(new THREE.Vector3(-w / 2 - 2, -h / 2, -d / 2));
      let lineZ = new THREE.Line(lineGz, lineMz);

      lineGroup.add(lineX);
      lineGroup.add(lineY);
      lineGroup.add(lineZ);

      return lineGroup;
    };
    const createLegs = () => {
      const legsGroup = new THREE.Group();
      const hexGroup = new THREE.Group();
      const legG = new THREE.BoxGeometry(frameThickness, 5, frameThickness);
      const legGb = new THREE.BufferGeometry().fromGeometry(legG);
      const legM = new THREE.MeshBasicMaterial({
        color: this.state.color
      });
      const leg = new THREE.Mesh(legGb, legM);

      const hexG = new THREE.CylinderGeometry(2, 2, 1, 8);
      const hexGb = new THREE.BufferGeometry().fromGeometry(hexG);
      const hex = new THREE.Mesh(hexGb, legM);

      for (let i = 0; i < 4; i++) {
        const legClone = leg.clone();
        const hexClone = hex.clone();
        legsGroup.add(legClone);
        hexGroup.add(hexClone);
      }
      legsGroup.children[0].position.set(-w / 2 + 1, -h / 2 - 2.5, d / 2 - 1);
      legsGroup.children[1].position.set(w / 2 - 1, -h / 2 - 2.5, d / 2 - 1);
      legsGroup.children[2].position.set(w / 2 - 1, -h / 2 - 2.5, -d / 2 + 1);
      legsGroup.children[3].position.set(-w / 2 + 1, -h / 2 - 2.5, -d / 2 + 1);

      hexGroup.children[0].position.set(-w / 2 + 1, -h / 2 - 4.5, d / 2 - 1);
      hexGroup.children[1].position.set(w / 2 - 1, -h / 2 - 4.5, d / 2 - 1);
      hexGroup.children[2].position.set(w / 2 - 1, -h / 2 - 4.5, -d / 2 + 1);
      hexGroup.children[3].position.set(-w / 2 + 1, -h / 2 - 4.5, -d / 2 + 1);

      legsGroup.add(hexGroup);

      return legsGroup;
    };

    for (let i = 2; i < this.state.amount; i++) {
      this.allParts.add(
        createShelf(
          -h / 2 + (h / (this.state.amount - 1)) * (i - 1),
          this.state.materials[i - 1]
        )
      );
    }

    this.allParts.add(createShelf(-h / 2 + 1, this.state.materials[0]));
    this.allParts.add(
      createShelf(h / 2 + -1, this.state.materials[this.state.amount - 1])
    );
    this.allParts.add(createColumns());
    if (this.state.type) {
      this.allParts.add(createLegs());
    }
    this.allParts.add(createAxes());
    // const axesHelper = new THREE.AxesHelper(h);
    // axesHelper.position.set(-w / 2 - 1, -h / 2 + 1, -d / 2 - 1);
    return this.allParts;
  };
  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }
  componentDidUpdate(prevProps, prevState) {
    this.scene.remove(this.scene.children[0]);
    this.scene.add(this.createBox(this.state.type));
  }

  static getDerivedStateFromProps(props, state) {
    return {
      dimensions: props.dims,
      type: props.type,
      amount: props.amount,
      materials: props.materialsArr
    };
  }
  // componentWillReceiveProps(newProps) {
  //   this.setState(
  //     {
  //       dimensions: newProps.dims,
  //       type: newProps.type,
  //       amount: newProps.amount
  //     },
  //     () => {
  //       this.scene.remove(this.scene.children[0]);
  //       this.scene.add(this.createBox(this.state.type));
  //     }
  //   );
  // }
  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };
  stop = () => {
    cancelAnimationFrame(this.frameId);
  };
  animate = () => {
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
    this.controls.update();
  };
  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  toggleFullScreen = () => {
    const { camera, renderer } = this;
    const visBox = document.querySelector(".visualization");
    if (!this.state.fullScreen) {
      this.setState(
        {
          aspect: window.innerWidth / window.innerHeight
        },
        () => {
          camera.aspect = this.state.aspect;
          camera.updateProjectionMatrix();
          visBox.requestFullscreen();
          renderer.setSize(window.innerWidth, window.innerHeight);
          camera.position.set(120, 40, 120);
        }
      );
    } else {
      this.setState(
        {
          aspect: 1.415
        },
        () => {
          camera.aspect = 1.415;
          camera.updateProjectionMatrix();
          document.exitFullscreen();
          renderer.setSize(this.state.mountWidth, this.state.mountHeight);
          camera.position.set(75, 40, 75);
        }
      );
    }
  };
  render() {
    return (
      <div className="visualization">
        <div className="buttons">
          <button
            className="button"
            onClick={() => {
              this.setState(
                prevState => ({ rotation: !prevState.rotation }),
                () => {
                  this.controls.autoRotate = this.state.rotation;
                }
              );
            }}
          >
            {this.state.rotation ? (
              <i className="material-icons">sync_disabled</i>
            ) : (
              <i className="material-icons">sync</i>
            )}
          </button>
          <button className="button" onClick={this.toggleFullScreen}>
            {this.state.fullScreen ? (
              <i className="material-icons">fullscreen_exit</i>
            ) : (
              <i className="material-icons">fullscreen</i>
            )}
          </button>
        </div>
        <div
          className="render"
          ref={mount => {
            this.mount = mount;
          }}
        />
      </div>
    );
  }
}
