import React, { Component } from "react"
import { connect } from "react-redux"
import firebase from "firebase"
import { authActions } from "../actions"

import Container from "react-bootstrap/lib/Container"
import Row from "react-bootstrap/lib/Row"
import Col from "react-bootstrap/lib/Col"
import Form from "react-bootstrap/lib/Form"
import Button from "react-bootstrap/lib/Button"

import { NavLink } from "react-router-dom"
import { Redirect } from "react-router"

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            name: "",
            error: false,
            errorMessage: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // Sign Up
    handleSubmit(e) {
        e.preventDefault()
        const { email, password, name } = this.state
        const { dispatch } = this.props
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function(auth) {
                const user = auth.user
                dispatch(authActions.login(user.uid))
                firebase
                    .database()
                    .ref("users/" + user.uid)
                    .update({
                        name: name,
                        email: email
                    })
                user.sendEmailVerification()
                    .then(function() {
                        debugger
                    })
                    .catch(function(error) {
                        console.log(error)
                        debugger
                    })
            })
            .catch(function(error) {
                debugger
                alert(
                    "Unable to create an account at this moment, please try again later."
                )
            })
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    render() {
        let mensajeAlerta = <p />
        if (this.state.error) {
            mensajeAlerta = <p> {this.state.errorMessage}</p>
        }
        if (this.props.auth.uid) {
            return <Redirect to="/" />
        }
        return (
            <Container>
                <Row>
                    <Col md={{ offset: 3, span: 6 }}>
                        <Form onSubmit={e => this.handleSubmit(e)}>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    placeholder="Name and Lastname"
                                    name="name"
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    name="email"
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone
                                    else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="***********"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    name="password"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={{ span: 6, offset: 3 }}>
                        <span>Already have an account? </span>
                        <NavLink to="/login">Login</NavLink>
                    </Col>
                </Row>
                {mensajeAlerta}
            </Container>
        )
    }
}

const mapStateToProps = ({ auth }) => ({
    auth
})
export default connect(mapStateToProps)(SignUp)
