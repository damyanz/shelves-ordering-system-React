import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
class OrderList extends Component {
  state = {
    orders: null
  };
  componentDidMount() {
    this.getOrders();
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
  getOrders = () => {
    let ordersArr = [];
    if (this.props.orders) {
      this.props.loadingState(true);
      Object.keys(this.props.orders).map(item => {
        let db = firebase
          .database()
          .ref(`orders/${item}`)
          .orderByKey();
        db.on("value", snapshot => {
          ordersArr.push(snapshot.val());
        });
        return null;
      });
      this.setState(
        {
          orders: ordersArr
        },
        () => this.getStatuses()
      );
    }
  };
  render() {
    const { orders, statuses } = this.state;
    let rows = [];
    if (orders && statuses) {
      Object.entries(orders)
        .reverse()
        .map((item, index) => {
          const { numer, data, szczegoly, status } = item[1];
          if (item) {
            rows.push(
              <tr key={index}>
                <td>{numer}</td>
                <td>{data}</td>
                <td>{szczegoly.suma.brutto.replace(".", ",")} zł</td>
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
      <div className="col-lg">
        <h4>Lista twoich zamówień:</h4>
        {orders && statuses ? (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-sm">
              <thead className="text-uppercase">
                <tr>
                  <th scope="col">numer</th>
                  <th scope="col">data</th>
                  <th scope="col">status</th>
                  <th scope="col">wartość</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
        ) : (
          <h4>Brak zamówień</h4>
        )}
      </div>
    );
  }
}
export default withRouter(OrderList);
