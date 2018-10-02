import React from "react"
import PropTypes from "prop-types"
import { Provider } from "react-redux"
import { Route, NavLink } from "react-router-dom"
import Navbar from "react-bootstrap/lib/Navbar"
import Nav from "react-bootstrap/lib/Nav"
import App from "./App"
import CellCount from "./CellCount"
import ActivityLog from "./ActivityLog"
import firebase from "firebase"

const Root = ({ store }) => (
    <Provider store={store}>
        <React.Fragment>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand href="/">iGEM</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink exact to="/" className="nav-link">
                            Home
                        </NavLink>
                        <NavLink to="/cellcount" className="nav-link">
                            Cell Count
                        </NavLink>
                        <NavLink to="/activitylog" className="nav-link">
                            Activity
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Route exact path="/" component={App} />
            <Route path="/cellcount" component={CellCount} />
            <Route path="/activitylog" component={ActivityLog} />
        </React.Fragment>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired
}
export default Root

