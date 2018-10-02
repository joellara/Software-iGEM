import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Root from "./containers/Root";
import configureStore from "./store/configureStore";
import firebase from 'firebase';

const store = configureStore();

const config = {
  apiKey: "AIzaSyAnjGx53zPSeTmg471BzrxpypaVZLVeevk",
  authDomain: "igem-texem.firebaseapp.com",
  databaseURL: "https://igem-texem.firebaseio.com/",
  projectId: "igem-texem"
};
firebase.initializeApp(config);

render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById("root")
);
