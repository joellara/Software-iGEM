import React, { Component } from "react"
import SignUp from './SignUp'
import firebase from 'firebase';
class App extends Component {
    constructor(props) {
        super(props)

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                debugger;
                // TODO: guardar el token en el app state
            } else {
                debugger;
                // TODO: render signUp
            }
        });

    }

    render() {
        return <SignUp/>
    }
}

export default App
