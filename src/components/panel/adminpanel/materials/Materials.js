import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export default class Materials extends Component {
  _isMounted = false;
  state = {
    materialy: "",
    loading: false,
    writeRes: 0
  };

  componentDidMount() {
    this.props.setBookmark(2);
    this._isMounted = true;
    this.getMaterialsData();
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.timeout);
  }
  getMaterialsData = () => {
    this.props.loadingState(true);
    let db = firebase.database().ref("/wizualizacja/materialy");
    db.on("value", snapshot => {
      if (this._isMounted) {
        this.setState(
          {
            marza: snapshot.val().marza,
            materialy: snapshot.val().lista
          },
          () => this.props.loadingState(false)
        );
      }
    });
  };
  updateMaterialsPrices = () => {
    this.props.loadingState(true);
    const update = {};
    update["/wizualizacja/materialy/lista"] = this.state.materialy;
    update["/wizualizacja/materialy/marza"] = this.state.marza;

    firebase
      .database()
      .ref()
      .update(update, error => {
        if (error) {
          this.setState({ writeRes: 2 });
        } else {
          this.props.loadingState(false);
          this.setState({ writeRes: 1 }, () => {
            this.timeout = setTimeout(
              () => this.setState({ writeRes: 0 }),
              3000
            );
          });
        }
      });
  };
  updateValue = (id, event) => {
    const { name, value } = event.target;

    if (name !== "marza") {
      let tempState = this.state.materialy;
      tempState[id].rodzaje[name].cena = parseFloat(value);
      this.setState({
        materialy: tempState
      });
    } else {
      this.setState({
        marza: value
      });
    }
  };

  render() {
    const { materialy, marza } = this.state;
    let rows = [];
    let resMessage;
    if (materialy && marza) {
      materialy.map((typ, id) => {
        if (id !== 0) {
          typ.rodzaje.map((rodzaj, jd) => {
            const { nazwa, cena } = rodzaj;
            rows.push(
              <tr key={nazwa}>
                <td>{typ.typ}</td>
                <td>{nazwa}</td>
                <td>
                  <input
                    className="price-input"
                    name={jd}
                    type="number"
                    step="0.01"
                    value={cena}
                    onChange={event => this.updateValue(id, event)}
                  />
                </td>
              </tr>
            );
            return null;
          });
        }
        return null;
      });
      rows.push(
        <tr key="marza">
          <td>
            <strong>Marża</strong>
          </td>
          <td>
            <strong>%</strong>
          </td>
          <td>
            <input
              className="price-input"
              name="marza"
              type="number"
              step="1"
              value={marza}
              onChange={event => this.updateValue("marza", event)}
            />
          </td>
        </tr>
      );
      switch (this.state.writeRes) {
        case 1: {
          resMessage = (
            <div className="alert alert-success">
              <strong>Sukces!</strong> Ceny zostały zaktualizowane.
            </div>
          );
          break;
        }
        case 2: {
          resMessage = (
            <div className="alert alert-danger">
              <strong>Wystąpił błąd!</strong> Ceny nie zostały zaktualizowane.
              Skontaktuj się z administratorem!
            </div>
          );
          break;
        }
        default: {
          resMessage = null;
          break;
        }
      }
    }
    return (
      <div className="row justify-content-between">
        {this.state.materialy && this.state.marza ? (
          <div className="col-lg">
            <div className="table-responsive">
              <table className="table table-striped table-hover table-sm">
                <thead className="text-uppercase">
                  <tr>
                    <th scope="col">Typ materiału</th>
                    <th scope="col">rodzaj materiału</th>
                    <th scope="col">
                      cena netto m<sup>2</sup>
                    </th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </table>
            </div>
            <button className="submit" onClick={this.updateMaterialsPrices}>
              zapisz zmiany
            </button>
            {resMessage}
          </div>
        ) : null}
      </div>
    );
  }
}
