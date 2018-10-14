import React, { Component } from "react"
import PropTypes from "prop-types"
import { Provider, connect } from "react-redux"
import { withRouter } from "react-router"
import { Route, NavLink, Switch } from "react-router-dom"
import { authActions } from "../actions"

import Navbar from "react-bootstrap/lib/Navbar"
import Nav from "react-bootstrap/lib/Nav"

import App from "./App"
import CellCount from "./CellCount"
import ActivityLog from "./ActivityLog"
import BiobrickBuilder from "./BiobrickBuilder"
import Login from "./Login"
import Signup from "./Signup"
import firebase from "firebase"
import "../css/body.css"

class Root extends Component {
    constructor(props) {
        super(props)
        this.onSelect = this.onSelect.bind(this)
    }
    componentDidMount() {
        const { dispatch } = this.props
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                dispatch(authActions.login(user.uid))
            } else {
                // TODO: dispatch signUp
            }
        })
    }
    onSelect(eventKey) {
        const { dispatch, userId } = this.props
        if (eventKey === "logOut") {
            firebase
                .auth()
                .signOut()
                .then(function() {
                    dispatch(authActions.logout())
                })
                .catch(function() {
                    alert(
                        "Unable to log out at this moment, please try again later."
                    )
                })
        }
    }
    render() {
        return (
            <Provider store={this.props.store}>
                <React.Fragment>
                    <Navbar fixed="top" bg="dark" expand="lg" variant="dark">
                        <Navbar.Brand as={NavLink} exact to="/">
                            iGEM
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link as={NavLink} exact to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/cellcount">
                                    Cell Count
                                </Nav.Link>
                                {this.props.auth.UID && (
                                    <Nav.Link as={NavLink} to="/activitylog">
                                        Activity
                                    </Nav.Link>
                                )}
                                <Nav.Link as={NavLink} to="/bbbuilder">
                                    Biobrick Builder
                                </Nav.Link>
                            </Nav>
                            <Nav className="ml-auto">
                                {!this.props.auth.UID && (
                                    <React.Fragment>
                                        <Nav.Link as={NavLink} to="/login">
                                            Login
                                        </Nav.Link>
                                        <Nav.Link as={NavLink} to="/signup">
                                            Sign Up
                                        </Nav.Link>
                                    </React.Fragment>
                                )}
                                {this.props.auth.UID && (
                                    <Nav.Link
                                        eventKey="logOut"
                                        onSelect={this.onSelect}>
                                        Logout
                                    </Nav.Link>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route path="/cellcount" component={CellCount} />
                        <Route path="/activitylog" component={ActivityLog} />
                        <Route path="/bbbuilder" component={BiobrickBuilder} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                    </Switch>
                </React.Fragment>
            </Provider>
        )
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    ...state
})
export default withRouter(connect(mapStateToProps)(Root))
