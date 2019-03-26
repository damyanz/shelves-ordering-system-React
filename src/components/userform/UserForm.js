import React, { Component } from "react";
import "./userform.scss";
import Loader from "../loader/Loader";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import SignIn from "./signIn/SignIn";
import SignUp from "./signUp/SignUp";
import { withRouter } from "react-router-dom";
class UserForm extends Component {
  state = {
    login: "",
    password: "",
    badPass: false,
    signing: false,
    error: "",
    formType: 0
  };

  componentDidMount() {
    this.authsub = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ signing: false });
        this.props.history.push("/panel");
      } else {
      }
    });
  }

  componentWillUnmount() {
    this.authsub();
  }
  toggleLoader = v => {
    this.setState({ signing: v });
  };

  render() {
    return (
      <div className="row justify-content-center">
        <div
          className={
            this.state.formType === 0 ? "col-xl-4 form" : "col-xl-6 form"
          }
        >
          <div className="formBox">
            <div className="formSwitch">
              <button
                className={
                  this.state.formType === 0 ? "redButton" : "grayButton"
                }
                onClick={() => this.setState({ formType: 0 })}
              >
                logowanie
              </button>
              <button
                className={
                  this.state.formType === 1 ? "redButton" : "grayButton"
                }
                onClick={() => this.setState({ formType: 1 })}
              >
                rejestracja
              </button>
            </div>
            <div className="formElement">
              {this.state.formType === 0 ? (
                <SignIn loadingState={this.toggleLoader} />
              ) : (
                <SignUp loadingState={this.toggleLoader} />
              )}
            </div>
            <div className="sampleuser">
              Przykładowe dane logowania:
              <ul>
                <li>
                  <strong>Administrator</strong>
                  <br />
                  administrator@shelves.pl | admin1234
                </li>
                <li>
                  <strong>Użytkownik standardowy</strong>
                  <br />
                  test@user.pl | test1234
                </li>
              </ul>
            </div>
          </div>
        </div>
        {this.state.signing ? <Loader /> : null}
      </div>
    );
  }
}

export default withRouter(UserForm);
