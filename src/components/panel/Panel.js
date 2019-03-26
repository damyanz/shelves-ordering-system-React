import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { withRouter } from "react-router-dom";
import "./panel.scss";
import Loader from "../loader/Loader";
import AdminPanel from "./adminpanel/AdminPanel";
import UserPanel from "./userpanel/UserPanel";

class Panel extends Component {
  state = {
    user_data: null
  };
  componentDidMount() {
    this.authsub = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.fetchUserDetails();
      } else {
        this.props.history.push("/zaloguj");
      }
    });
  }

  fetchUserDetails = () => {
    const userId = firebase.auth().currentUser.uid;
    return firebase
      .database()
      .ref("/users/" + userId)
      .once("value")
      .then(snapshot => {
        this.setState({ user_data: snapshot.val() });
      });
  };
  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {})
      .catch(function(error) {});
  };
  componentWillUnmount() {
    this.authsub();
  }
  render() {
    return (
      <div className="main">
        {this.state.user_data ? (
          this.state.user_data.admin ? (
            <AdminPanel {...this.state.user_data} signOut={this.signOut} />
          ) : (
            <UserPanel {...this.state.user_data} signOut={this.signOut} />
          )
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default withRouter(Panel);
