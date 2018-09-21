import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Route, NavLink } from "react-router-dom";
import App from "./App";
import CellCount from "./CellCount";
import ActivityLog from "./ActivityLog"

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          iGEM
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cellcount">
                Cell Count App
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/activitylog">
                Activity Log
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Route exact path="/" component={App} />
      <Route path="/cellcount" component={CellCount} />
      <Route path="/activitylog" component={ActivityLog} />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};
export default Root;
