import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "../userform.scss";
import errors from "../errors.js";

export default class SignIn extends Component {
  state = {
    login: "",
    password: "",
    error: ""
  };
  handleSubmit = event => {
    this.props.loadingState(true);
    const { login, password } = this.state;
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return firebase
          .auth()
          .signInWithEmailAndPassword(login, password)
          .catch(error => {
            this.setState({
              password: "",
              error: this.showError(error.code)
            });
            this.props.loadingState(false);
          });
      });

    event.preventDefault();
  };

  showError = error => {
    let errorMsg = errors[error];
    if (!errorMsg) return errors.default;
    return errorMsg;
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="formRow">
          <div className="formInput">
            <i className="material-icons">person</i>
            <input
              type="text"
              value={this.state.login}
              onChange={e => this.setState({ login: e.target.value })}
              placeholder="Adres e-mail"
              required
            />
          </div>
        </div>
        <div className="formRow">
          <div className="formInput">
            <i className="material-icons">lock</i>
            <input
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
              placeholder="Hasło"
              required
            />
          </div>
        </div>
        <div className="underInputs">
          <small>Zapomniałeś hasła?</small>
          <button type="submit" className="submit redButton">
            zaloguj
          </button>
        </div>
        {this.state.error !== "" ? (
          <small className="red">{this.state.error}</small>
        ) : null}
      </form>
    );
  }
}
