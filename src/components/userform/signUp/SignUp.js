import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "../userform.scss";
import errors from "../errors.js";

export default class SignUp extends Component {
  state = {
    login: "",
    password: "",
    confirm_pass: "",
    imie: "",
    nazwisko: "",
    nr_tel: "+48",
    adres: "",
    kod_pocztowy: "",
    miejscowosc: "",
    error: "",
    regulamin: false
  };

  componentDidMount() {}
  validateForm = () => {
    const { password, confirm_pass } = this.state;
    if (password !== confirm_pass) {
      this.setState({ password: "", confirm_pass: "", error: "bad pass" });
      return false;
    }
    return true;
  };
  handleSubmit = event => {
    //this.props.loadingState(true);
    if (this.validateForm()) {
      this.props.loadingState(true);
      this.signUpUser();
    }

    event.preventDefault();
  };

  sendVerificationMail = () => {
    const user = firebase.auth().currentUser;
    user
      .sendEmailVerification()
      .then(function() {})
      .catch(function(error) {});
  };
  writeUserDetails = user => {
    if (user.uid) {
      const {
        login,
        imie,
        nazwisko,
        nr_tel,
        adres,
        kod_pocztowy,
        miejscowosc
      } = this.state;
      const date = new Date().toLocaleString("pl");
      firebase
        .database()
        .ref("users/" + user.uid)
        .set({
          email: login,
          imie: imie,
          nazwisko: nazwisko,
          nr_tel: nr_tel,
          adres: adres,
          kod_pocztowy: kod_pocztowy,
          miejscowosc: miejscowosc,
          data_utworzenia: date
        })
        .then(() => this.props.loadingState(false));
    }
  };
  showError = error => {
    let errorMsg = errors[error];
    if (!errorMsg) return errors.default;
    return errorMsg;
  };

  signUpUser = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.login, this.state.password)
      .then(user => {
        this.writeUserDetails(user.user);
      })
      .catch(error => {
        this.setState({
          password: "",
          confirm_pass: "",
          error: this.showError(error.code)
        });
        this.props.loadingState(false);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>Dane logowania</h4>

        <div className="formRow">
          <div className="formInput">
            <input
              type="email"
              value={this.state.login}
              onChange={e => this.setState({ login: e.target.value })}
              placeholder="Adres e-mail*"
              required
            />
          </div>
        </div>
        <div className="formRow">
          <div className="formInput inline">
            <input
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
              placeholder="Hasło*"
              minLength="8"
              required
            />
          </div>
          <div className="formInput inline">
            <input
              type="password"
              value={this.state.confirm_pass}
              onChange={e => this.setState({ confirm_pass: e.target.value })}
              placeholder="Potwierdź hasło*"
              minLength="8"
              required
            />
          </div>
        </div>
        {this.state.error === "bad pass" ? (
          <small className="red">Wprowadzone hasła muszą być identyczne</small>
        ) : null}

        <h4>Dane osobiste</h4>
        <div className="formRow">
          <div className="formInput inline">
            <input
              type="text"
              value={this.state.imie}
              onChange={e => this.setState({ imie: e.target.value })}
              placeholder="Imię*"
              minLength="2"
              required
            />
          </div>
          <div className="formInput inline">
            <input
              type="text"
              value={this.state.nazwisko}
              onChange={e => this.setState({ nazwisko: e.target.value })}
              placeholder="Nazwisko*"
              minLength="2"
              required
            />
          </div>
        </div>
        <div className="formRow">
          <div className="formInput">
            <input
              type="tel"
              value={this.state.nr_tel}
              onChange={e => this.setState({ nr_tel: e.target.value })}
              placeholder="Numer telefonu*"
              required
            />
          </div>
        </div>
        <div className="formRow">
          <div className="formInput">
            <input
              type="text"
              value={this.state.adres}
              onChange={e => this.setState({ adres: e.target.value })}
              placeholder="Adres zamieszkania*"
              minLength="2"
              required
            />
          </div>
        </div>
        <div className="formRow">
          <div className="formInput inline">
            <input
              type="text"
              value={this.state.kod_pocztowy}
              onChange={e => this.setState({ kod_pocztowy: e.target.value })}
              placeholder="Kod pocztowy*"
              pattern="^[0-9]{2}-[0-9]{3}$"
              required
            />
          </div>
          <div className="formInput inline">
            <input
              type="text"
              value={this.state.miejscowosc}
              onChange={e => this.setState({ miejscowosc: e.target.value })}
              placeholder="Miejscowość*"
              minLength="2"
              required
            />
          </div>
        </div>
        <div className="formRow">
          <input
            type="checkbox"
            className="checkBox"
            checked={this.state.regulamin}
            onChange={e => this.setState({ regulamin: e.target.checked })}
            required
          />{" "}
          <small className="oswiadczenie">
            Oświadczam, iż zapoznałem się z <strong>Regulaminem</strong> i{" "}
            <strong>Polityką Prywatności</strong> firmy{" "}
            <strong>ArtvinylPol</strong> i akceptuję ich treść.
          </small>
        </div>
        <div className="underInputs">
          <button
            type="submit"
            className={this.state.regulamin ? "redButton" : "grayButton"}
            disabled={!this.state.regulamin}
          >
            zarejestruj
          </button>
        </div>
        {this.state.error !== "" && this.state.error !== "bad pass" ? (
          <small className="red">{this.state.error}</small>
        ) : null}
      </form>
    );
  }
}
