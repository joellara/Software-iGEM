import React, { Component } from "react"
import { SignUp } from "./SignUp"
import firebase from "firebase"

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <h1> This is home </h1>
        //return <SignUp />
    }
}

export default App
