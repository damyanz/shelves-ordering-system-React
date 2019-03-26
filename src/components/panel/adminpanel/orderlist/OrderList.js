import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
class OrderList extends Component {
  state = {
    orders: null,
    users: {},
    admin: false,
    statuses: null
  };
  componentDidMount() {
    this.props.setBookmark(0);
    this.getPartsData();
  }

  componentWillUnmount() {
    //this.getPartsData();
  }

  getStatuses = () => {
    let db = firebase.database().ref("statuses");
    db.once("value", snapshot => {
      this.setState(
        {
          statuses: snapshot.val()
        },
        () => {
          this.props.loadingState(false);
        }
      );
    });
  };

  getPartsData = () => {
    this.props.loadingState(true);
    let db = firebase
      .database()
      .ref("orders")
      .orderByKey();
    db.on("value", snapshot => {
      this.setState(
        {
          orders: snapshot.val()
        },
        () => {
          this.getStatuses();
        }
      );
    });
  };

  render() {
    const { orders, statuses } = this.state;
    let rows = [];
    if (orders && statuses) {
      Object.entries(orders)
        .reverse()
        .map((item, index) => {
          const { numer, data, uzytkownik, status } = item[1];
          if (item) {
            rows.push(
              <tr key={index}>
                <td>{numer}</td>
                <td>
                  {uzytkownik
                    .slice(uzytkownik.length - 9, uzytkownik.length - 1)
                    .toUpperCase()}
                </td>
                <td>{data}</td>
                <td>{statuses[status]}</td>
                <td>
                  <Link to={`/zamowienie/${numer}`}>Pokaż szczegóły</Link>
                </td>
              </tr>
            );
          }
          return null;
        });
    }
    return (
      <div className="row justify-content-between">
        {this.state.orders && this.state.statuses && (
          <div className="col-lg">
            <div className="table-responsive">
              <table className="table table-striped table-hover table-sm">
                <thead className="text-uppercase">
                  <tr>
                    <th scope="col">numer</th>
                    <th scope="col">klient</th>
                    <th scope="col">data</th>
                    <th scope="col">status</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(OrderList);
