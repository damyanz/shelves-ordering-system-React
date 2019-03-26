import React, { Component } from "react";
import OrderList from "./orderlist/OrderList";
import Loader from "../../loader/Loader";
import "./userpanel.scss";
export default class UserPanel extends Component {
  state = {
    imie: this.props.imie
  };
  toggleLoader = v => {
    this.setState({ loading: v });
  };

  render() {
    return (
      <div>
        <div className="row justify-content-between">
          <div className="col-lg-10">
            <h3>Witaj, {this.state.imie}</h3>
          </div>
          <div className="col-lg-2 text-right">
            <button className="submit" onClick={this.props.signOut}>
              wyloguj
            </button>
          </div>
        </div>
        <div className="row justify-content-between gap">
          <OrderList {...this.props} loadingState={this.toggleLoader} />
        </div>
        {this.state.loading ? <Loader /> : null}
      </div>
    );
  }
}
