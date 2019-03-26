import React, { Component } from "react";
import "./options.scss";
import Shelves from "./Shelves/Shelves";
import Select from "../../select/Select";
export default class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      dims: {
        w: 70,
        h: 50,
        d: 70
      },
      type: false,
      mountingType: null,
      minAmount: 2,
      maxAmount: 5,
      selectedAmount: 2,
      materialsArr: []
    };
  }

  componentDidMount() {}

  changeDim = event => {
    const { id, value } = event.target;
    const dims = { ...this.state.dims };
    switch (id) {
      case "w":
        dims.w = parseInt(value);
        break;
      case "h":
        dims.h = parseInt(value);
        break;
      case "d":
        dims.d = parseInt(value);
        break;
      default:
        break;
    }

    this.setState({ dims });
    this.props.handleDims(id, value);
  };

  changeType = event => {
    const val = event.target.value == "true";

    this.setState({
      type: val,
      mountingType: null
    });
    this.props.handleType(val);
    this.props.handleMountingType(null);
  };
  changeMountingType = event => {
    const val = event.target.value;
    if (val == this.state.mountingType) {
      this.setState({ mountingType: null });
      this.props.handleMountingType(null);
    } else {
      this.setState({
        mountingType: val
      });
      this.props.handleMountingType(val);
    }
  };

  changeAmount = event => {
    let arr = [];
    const amount = parseInt(event.target.value);
    for (let i = 0; i < amount; i++) {
      arr.push([null, null]);
    }
    this.setState(
      {
        selectedAmount: amount
      },
      () => {
        this.props.handleAmount(amount);
        this.props.handleMaterials(arr);
      }
    );
  };

  render() {
    let { w, h, d } = this.state.dims;
    return (
      <div>
        <h3>Wymiary:</h3>
        <input
          id="w"
          type="range"
          className="range"
          value={w}
          min={15}
          max={200}
          step={1}
          onChange={this.changeDim}
        />
        <span className="value">
          Szerokość: <strong>{this.state.dims.w}</strong> cm
        </span>
        <input
          id="h"
          type="range"
          className="range"
          value={h}
          min={15}
          max={200}
          step={1}
          onChange={this.changeDim}
        />
        <span className="value">
          Wysokość: <strong>{this.state.dims.h}</strong> cm
        </span>
        <input
          id="d"
          type="range"
          className="range"
          value={d}
          min={15}
          max={200}
          step={1}
          onChange={this.changeDim}
        />
        <span className="value">
          Głębokość: <strong>{this.state.dims.d}</strong> cm
        </span>
        <hr />
        <h3>Typ:</h3>
        <div className="radioGroup">
          <div className="radio">
            <input
              id="radio-1"
              name="type"
              type="radio"
              value={false}
              onChange={this.changeType}
              checked={this.state.type == false}
            />
            <label htmlFor="radio-1" className="radio-label">
              Regał
            </label>
          </div>

          <div className="radio">
            <input
              id="radio-2"
              name="type"
              type="radio"
              value={true}
              onChange={this.changeType}
              checked={this.state.type == true}
            />
            <label htmlFor="radio-2" className="radio-label">
              Stolik
            </label>
          </div>
        </div>
        {!this.state.type ? (
          <div>
            <h5>Mocowanie:</h5>
            <div className="radioGroup">
              <div className="radio">
                <input
                  id="radio-3"
                  name="mountingType"
                  type="radio"
                  value={0}
                  onClick={this.changeMountingType}
                  onChange={this.changeMountingType}
                  checked={this.state.mountingType == 0}
                />
                <label htmlFor="radio-3" className="radio-label">
                  Fasolki
                </label>
              </div>

              <div className="radio">
                <input
                  id="radio-4"
                  name="mountingType"
                  type="radio"
                  value={1}
                  onClick={this.changeMountingType}
                  onChange={this.changeMountingType}
                  checked={this.state.mountingType == 1}
                />
                <label htmlFor="radio-4" className="radio-label">
                  Kołki
                </label>
              </div>
            </div>
          </div>
        ) : null}
        <hr />
        <div className="amount">
          <h3>Ilość półek:</h3>
          <Select
            minAmount={this.state.minAmount}
            maxAmount={this.state.maxAmount}
            onChange={this.changeAmount}
          />
        </div>
        <hr />
        <Shelves
          data={this.props.shelvesData}
          amount={this.props.shelvesAmount}
          generatePlates={this.props.shelvesGeneratePlates}
        />
      </div>
    );
  }
}
