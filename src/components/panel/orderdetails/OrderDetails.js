import React, { Component } from "react";
import Loader from "../../loader/Loader";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "./orderdetails.scss";
import { Link, withRouter } from "react-router-dom";
class OrderDetails extends Component {
  state = {
    user: false,
    userok: true,
    orderDetails: null,
    clientDetails: null,
    statuses: null,
    admin: false
  };

  componentDidMount() {
    this.userListener();
    this.getOrderDetails(this.props.match.params.numer);
  }

  userListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      user && this.checkUserType(user.uid);
    });
  };

  checkUserType = uid => {
    let db = firebase.database().ref(`users/${uid}`);
    db.on("value", snapshot => {
      this.setState({
        admin: snapshot.val().admin
      });
    });
  };

  getClientDetails = nr => {
    let db = firebase.database().ref(`users/${nr}`);
    db.on("value", snapshot => {
      this.setState({
        clientDetails: snapshot.val()
      });
    });
  };

  getStatuses = () => {
    let db = firebase.database().ref("statuses");
    db.once("value", snapshot => {
      this.setState({
        statuses: snapshot.val()
      });
    });
  };

  getOrderDetails = nr => {
    // this.props.loadingState(true);
    let db = firebase.database().ref(`orders/${nr}`);
    db.on("value", snapshot => {
      this.setState(
        {
          orderDetails: snapshot.val()
        },
        () => {
          this.getStatuses();
          this.getClientDetails(this.state.orderDetails.uzytkownik);
        }
      );
    });
  };

  changeStatus = e => {
    let db = firebase.database().ref(`orders/${this.state.orderDetails.numer}`);
    db.update({
      status: e.target.value
    });
  };

  componentWillUnmount() {}
  render() {
    let client, order;
    let shelves = [];
    this.state.clientDetails && (client = { ...this.state.clientDetails });

    if (this.state.orderDetails) {
      order = { ...this.state.orderDetails.szczegoly };

      const liczba_polek = order.ilosc_polek;
      for (let i = 0; i < liczba_polek; i++) {
        if (order.materialy && order.materialy[i]) {
          shelves.push(
            <tr key={i}>
              <td>{i}</td>
              <td>{order.materialy[i].typ}</td>
              <td>{order.materialy[i].rodzaj.nazwa}</td>
            </tr>
          );
        } else {
          shelves.push(
            <tr key={i}>
              <td>{i}</td>
              <td colSpan="2">brak wypełnienia</td>
            </tr>
          );
        }
      }
      shelves.reverse();
    }

    return (
      <div className="main">
        {this.state.orderDetails &&
        this.state.clientDetails &&
        this.state.statuses ? (
          <div>
            <div className="row justify-content-between">
              <div className="col-lg heading">
                <Link to="/panel">
                  <button className="redButton">
                    <i className="material-icons">arrow_back</i>powrót
                  </button>
                </Link>
                <h3>
                  Szczegóły zamówienia numer{" "}
                  <strong>{this.state.orderDetails.numer}</strong>
                </h3>
              </div>
            </div>
            <hr />
            <div className="row justify-content-between">
              <div className="col-lg-4">
                <div className="details">
                  <h4>Dane klienta</h4>
                  <hr />
                  <p>
                    <strong>
                      {client.imie} {client.nazwisko}
                    </strong>
                  </p>
                  <p>{client.adres}</p>
                  <p>
                    {client.kod_pocztowy} {client.miejscowosc}
                  </p>
                  <p>{client.nr_tel}</p>
                  <p>
                    <a href={`mailto:${client.email}`}>{client.email}</a>
                  </p>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="details orderDetails">
                  <h4>Dane zamówienia</h4>
                  <hr />
                  <p>
                    <strong>Data złożenia:</strong>{" "}
                    {this.state.orderDetails.data}
                  </p>
                  <p>
                    <strong>STATUS: </strong>
                    {this.state.admin ? (
                      <Select
                        values={this.state.statuses}
                        currVal={this.state.orderDetails.status}
                        onChange={this.changeStatus}
                      />
                    ) : (
                      <span>{this.state.statuses[order.status]}</span>
                    )}
                  </p>
                  <hr />
                  <p>
                    <strong>
                      Wymiary (szerokość x wysokość x głębokość):{" "}
                    </strong>
                    {order.wymiary.w} x {order.wymiary.h} x {order.wymiary.d}
                  </p>
                  {order.nogi.ilosc === 0 ? (
                    <div>
                      <p>
                        <strong>Typ: </strong>regał
                      </p>
                      <p>
                        <strong>Mocowanie: </strong>{" "}
                        {order.fasolki.ilosc === 1
                          ? "fasolki"
                          : order.kolki.ilosc === 1
                          ? "kołki"
                          : "brak"}
                      </p>
                    </div>
                  ) : (
                    <p>
                      <strong>Typ: </strong>stolik
                    </p>
                  )}
                  <p>
                    <strong>Ilość półek: </strong>
                    {order.ilosc_polek}
                  </p>
                  <strong>Wypełnienia: </strong>
                  <div className="table-responsive">
                    <table className="table table-bordered table-dark table-hover table-sm table-shelves">
                      <tbody>{shelves}</tbody>
                    </table>
                  </div>
                  {this.state.orderDetails.uwagi ? (
                    <div>
                      <strong>Uwagi do zamówienia: </strong>
                      <p>{this.state.orderDetails.uwagi}</p>
                    </div>
                  ) : null}
                  <hr />
                  <p>
                    <strong>Wartość zamówienia (brutto): </strong>{" "}
                    {order.suma.brutto} zł
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default withRouter(OrderDetails);

const Select = ({ values, currVal, onChange }) => {
  let options = [];
  values.map((item, index) => {
    options.push(
      <option value={index} key={item}>
        {item}
      </option>
    );
    return null;
  });

  return (
    <select className="select" onChange={onChange} value={currVal}>
      {options}
    </select>
  );
};
