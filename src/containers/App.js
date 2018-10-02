/* eslint-disable no-undef */

import React, { Component } from "react";
import {SignUp} from "./SignUp"
import firebase from 'firebase';

class App extends Component {
  constructor(props){
    super(props);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
      } else {
        // No user is signed in.
      }
    });
  }

  render() {
    //return <h1> This is home </h1>;
    return <SignUp/>;
  }
}

export default App;
