import React, { Component } from "react";
import "./shelves.scss";
export default class Shelves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      amount: this.props.amount,
      selectedMaterials: new Array(this.props.amount)
    };
  }

  componentDidMount() {}

  static getDerivedStateFromProps(props, state) {
    return props;
  }

  render() {
    let shelves = [];
    for (let i = 0; i < this.state.amount; i++) {
      shelves.push(
        <Shelf
          data={this.state.data}
          amount={this.state.amount}
          key={i}
          id={i + 1}
          handleMaterial={this.materialChange}
          selected={this.state.selectedMaterials}
          transport={this.props.generatePlates}
        />
      );
    }

    return (
      <div className="shelves">
        <h3>Wypełnienia półek</h3>
        {shelves}
      </div>
    );
  }
}

class Shelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
      selected: [],
      selectValue: 0
    };
  }
  componentDidMount() {
    this.getMaterials();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.amount !== prevProps.amount) {
      this.setState({
        types: [],
        selected: [],
        materials: [],
        selectValue: 0
      });
      this.getMaterials();
    }
  }
  getMaterials = () => {
    let materials = [];
    this.props.data.map((item, i) => {
      materials.push(
        <option value={i} key={i}>
          {item.typ}
        </option>
      );
      return null;
    });
    this.setState({
      materials: materials
    });
  };
  setTypes = event => {
    const value = parseInt(event.target.value);
    const temp = [...this.state.selected];
    temp[1] = value;
    this.setState(
      {
        selected: []
      },
      () => {
        this.setState(
          {
            selected: temp
          },
          () => {
            let data = {
              id: this.props.id - 1,
              arr: this.state.selected
            };
            this.props.transport(data);
          }
        );
      }
    );
  };
  getTypes = event => {
    const value = parseInt(event.target.value);
    if (this.props.data[value].rodzaje) {
      this.setState(
        {
          types: [],
          selectValue: value
        },
        () => {
          let temp = [];
          this.props.data[value].rodzaje.map((item, i) => {
            temp.push(
              <option value={i} key={i}>
                {item.nazwa}
              </option>
            );
            return null;
          });
          this.setState(
            {
              types: temp,
              selected: [value, 0]
            },
            () => {
              let data = {
                id: this.props.id - 1,
                arr: this.state.selected
              };
              this.props.transport(data);
            }
          );
        }
      );
    } else {
      this.setState(
        {
          selected: [null, null],
          types: [],
          selectValue: 0
        },
        () => {
          let data = {
            id: this.props.id - 1,
            arr: this.state.selected
          };
          this.props.transport(data);
        }
      );
    }
  };

  render() {
    return (
      <div className="shelf">
        <h5>{this.props.id}.</h5>
        <select
          materialid={this.props.id - 1}
          className="select-mat"
          onChange={this.getTypes}
          value={this.state.selectValue}
        >
          {this.state.materials}
        </select>
        {this.state.types[0] ? (
          <select className="select-mat" onChange={this.setTypes}>
            {this.state.types}
          </select>
        ) : null}
      </div>
    );
  }
}
