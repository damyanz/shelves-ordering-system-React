import React, { Component } from "react";
import "./adminpanel.scss";
import Loader from "../../loader/Loader";
import Parts from "./parts/Parts";
import OrderList from "./orderlist/OrderList";
import Materials from "./materials/Materials";
import UsersList from "./userslist/UsersList";
import { Route, Link, Switch, Redirect, withRouter } from "react-router-dom";
class AdminPanel extends Component {
  state = {
    loading: false,
    selectedBookmark: 0,
    success: false
  };

  toggleLoader = v => {
    this.setState({ loading: v });
  };
  setBookmark = v => {
    this.setState({ selectedBookmark: v });
  };
  render() {
    return (
      <div>
        <div className="row justify-content-between">
          <div className="col-lg-10">
            <h2>Panel administracyjny</h2>
            <h5 className="inline">
              {this.props.imie} {this.props.nazwisko}
            </h5>
          </div>
          <div className="col-lg-2 text-right">
            <button className="submit" onClick={this.props.signOut}>
              wyloguj
            </button>
          </div>
        </div>
        <hr />
        <div className="row justify-content-between">
          <div className="col-lg">
            <div className="formSwitch">
              <Link to="/panel/zamowienia" className="link--flex">
                <button
                  className={
                    this.state.selectedBookmark === 0
                      ? "redButton"
                      : "grayButton"
                  }
                >
                  zamówienia
                </button>
              </Link>
              <Link to="/panel/czesci" className="link--flex">
                <button
                  className={
                    this.state.selectedBookmark === 1
                      ? "redButton"
                      : "grayButton"
                  }
                >
                  części
                </button>
              </Link>
              <Link to="/panel/materialy" className="link--flex">
                <button
                  className={
                    this.state.selectedBookmark === 2
                      ? "redButton"
                      : "grayButton"
                  }
                >
                  materiały
                </button>
              </Link>
              <Link to="/panel/uzytkownicy" className="link--flex">
                <button
                  className={
                    this.state.selectedBookmark === 3
                      ? "redButton"
                      : "grayButton"
                  }
                >
                  użytkownicy
                </button>
              </Link>
            </div>
          </div>
        </div>
        <br />
        <Switch>
          <Route
            path="/panel/zamowienia"
            render={() => (
              <OrderList
                loadingState={this.toggleLoader}
                setBookmark={this.setBookmark}
              />
            )}
          />
          <Route
            path="/panel/czesci"
            render={() => (
              <Parts
                loadingState={this.toggleLoader}
                setBookmark={this.setBookmark}
              />
            )}
          />
          <Route
            path="/panel/materialy"
            render={() => (
              <Materials
                loadingState={this.toggleLoader}
                setBookmark={this.setBookmark}
              />
            )}
          />
          <Route
            path="/panel/uzytkownicy"
            render={() => (
              <UsersList
                loadingState={this.toggleLoader}
                setBookmark={this.setBookmark}
              />
            )}
          />
          <Redirect to="/panel/zamowienia" />
        </Switch>
        {/* {bookmark} */}
        {this.state.loading ? <Loader /> : null}
      </div>
    );
  }
}

export default withRouter(AdminPanel);
