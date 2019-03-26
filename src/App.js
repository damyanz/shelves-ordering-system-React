import React, { Component } from "react";
import "./App.scss";
import Header from "./components/header/Header";
import Content from "./components/content/Content";
import Home from "./components/home/Home";
import Contact from "./components/contact/Contact";
import Gallery from "./components/gallery/Gallery";
import UserForm from "./components/userform/UserForm";
import Panel from "./components/panel/Panel";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import SignUp from "./components/userform/signUp/SignUp";
import OrderDetails from "./components/panel/orderdetails/OrderDetails";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "shelves-ordering-system.firebaseapp.com",
  databaseURL: "https://shelves-ordering-system.firebaseio.com",
  projectId: "shelves-ordering-system",
  storageBucket: "shelves-ordering-system.appspot.com",
  messagingSenderId: "943667979678"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div className="estimation">
          <Header />
          <main className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/zaprojektuj" component={Content} />
              <Route path="/kontakt" component={Contact} />
              <Route path="/galeria" component={Gallery} />
              <Route path="/zaloguj" component={UserForm} />
              <Route path="/panel" component={Panel} />
              <Route path="/rejestracja" component={SignUp} />
              <Route
                name="zamowienie"
                path="/zamowienie/:numer"
                component={OrderDetails}
              />
              <Redirect to="/" />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
