import React from "react"
import PropTypes from "prop-types"
import { Provider } from "react-redux"
import { Route, NavLink, Switch } from "react-router-dom"
import Navbar from "react-bootstrap/lib/Navbar"
import Nav from "react-bootstrap/lib/Nav"
import App from "./App"
import CellCount from "./CellCount"
import ActivityLog from "./ActivityLog"
import BiobrickBuilder from "./BiobrickBuilder"
import "../css/body.css"

const Root = ({ store }) => (
    <Provider store={store}>
        <React.Fragment>
            <Navbar fixed="top" bg="dark" expand="lg" variant="dark">
                <Navbar.Brand as={NavLink} exact to="/">
                    iGEM
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/cellcount">
                            Cell Count
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/activitylog">
                            Activity
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/bbbuilder">
                            Biobrick Builder
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/cellcount" component={CellCount} />
                <Route path="/activitylog" component={ActivityLog} />
                <Route path="/bbbuilder" component={BiobrickBuilder} />
            </Switch>
        </React.Fragment>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired
}
export default Root
