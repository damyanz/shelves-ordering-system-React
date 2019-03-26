import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "./parts.scss";

export default class Parts extends Component {
  _isMounted = false;
  state = {
    czesci: "",
    loading: false,
    writeRes: 0
  };

  componentDidMount() {
    this.props.setBookmark(1);
    this._isMounted = true;
    this.getPartsData();
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearTimeout(this.timeout);
    //this.getPartsData();
  }
  getPartsData = () => {
    this.props.loadingState(true);
    let db = firebase.database().ref("/wizualizacja/czesci");
    db.on("value", snapshot => {
      if (this._isMounted) {
        this.setState(
          {
            czesci: snapshot.val()
          },
          () => this.props.loadingState(false)
        );
      }
    });
  };
  updatePartsPrices = () => {
    this.props.loadingState(true);
    const update = {};
    update["/wizualizacja/czesci"] = this.state.czesci;

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
  updateValue = event => {
    const { name, value } = event.target;
    let tempState = this.state.czesci;
    tempState[name].szczegoly.netto = parseFloat(value);
    this.setState({
      czesci: tempState
    });
  };

  render() {
    const { czesci } = this.state;
    let rows = [];
    let resMessage;
    if (czesci) {
      czesci.map((item, id) => {
        const { nazwa, jednostka, netto } = item.szczegoly;
        rows.push(
          <tr key={id}>
            <td>{nazwa}</td>
            <td>{jednostka}</td>
            <td>
              <input
                className="price-input"
                name={id}
                type="number"
                step="0.01"
                value={netto}
                onChange={this.updateValue}
              />
            </td>
          </tr>
        );
        return null;
      });

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
        {this.state.czesci ? (
          <div className="col-lg">
            <div className="table-responsive">
              <table className="table table-striped table-hover table-sm">
                <thead className="text-uppercase">
                  <tr>
                    <th scope="col">nazwa części</th>
                    <th scope="col">jednostka</th>
                    <th scope="col">cena netto</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </table>
            </div>
            <button className="submit" onClick={this.updatePartsPrices}>
              zapisz zmiany
            </button>
            {resMessage}
          </div>
        ) : null}
      </div>
    );
  }
}
