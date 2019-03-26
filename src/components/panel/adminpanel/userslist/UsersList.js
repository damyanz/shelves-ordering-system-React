import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { withRouter } from "react-router-dom";
class UsersList extends Component {
  state = {
    users: null,
    admin: false
  };
  componentDidMount() {
    this.props.setBookmark(3);
    this.getUsersData();
  }

  componentWillUnmount() {
    //this.getPartsData();
  }

  getUsersData = () => {
    this.props.loadingState(true);
    let db = firebase
      .database()
      .ref("users")
      .orderByKey();
    db.on("value", snapshot => {
      this.setState(
        {
          users: snapshot.val()
        },
        () => this.props.loadingState(false)
      );
    });
  };

  render() {
    const { users } = this.state;

    let rows = [];
    if (users) {
      Object.entries(users).map((item, index) => {
        const {
          imie,
          nazwisko,
          email,
          nr_tel,
          adres,
          kod_pocztowy,
          miejscowosc,
          data_utworzenia
        } = item[1];
        rows.push(
          <tr key={index}>
            <td>
              {imie} {nazwisko}
            </td>
            <td>{email}</td>
            <td>{nr_tel}</td>
            <td>
              {adres}, {kod_pocztowy} {miejscowosc}
            </td>
            <td>{data_utworzenia}</td>
          </tr>
        );
        return null;
      });
    }
    return (
      <div className="row justify-content-between">
        {this.state.users && (
          <div className="col-lg">
            <div className="table-responsive">
              <table className="table table-striped table-hover table-sm">
                <thead className="text-uppercase">
                  <tr>
                    <th scope="col">Imię i nazwisko</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Telefon</th>
                    <th scope="col">Adres</th>
                    <th scope="col">Data utworzenia</th>
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

export default withRouter(UsersList);
