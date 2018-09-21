import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Route, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import App from "./App";
import CellCount from "./CellCount";

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="/">iGEM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink exact to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink exact to="/cellcount" className="nav-link">
              Cell Count
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Route exact path="/" component={App} />
      <Route path="/cellcount" component={CellCount} />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};
export default Root;
