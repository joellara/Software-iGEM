import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import firebase from 'firebase';
import '../App.css'

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      error: false,
      errorMessage: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.doCreateUserWithEmailAndPassword = this.doCreateUserWithEmailAndPassword.bind(this);
    this.doLoginWithEmailAndPassword = this.doLoginWithEmailAndPassword.bind(this);

  }

  // Sign Up
  doCreateUserWithEmailAndPassword() {
    const _this = this;
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(auth){
      debugger;
      var user = auth.user;

      firebase.database().ref('users/'+user.uid).update({
        name:_this.state.name,
        email:_this.state.email,
      });

      user.sendEmailVerification().then(function() {
      }).catch(function(error) {
      });

    }).catch(function(error) {
      debugger;
      alert("Unable to create an account at this moment, please try again later.");

    });
  }

  doLoginWithEmailAndPassword(){
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(auth){
      debugger;
      let user = auth.user;
      let emailVerified;
      
      if (user != null) {
        emailVerified = user.emailVerified;
        let uid = user.uid; 
        if(emailVerified){
          //TODO: switch to home
        }
      }


    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });



  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    let mensajeAlerta = <p />;
    if (this.state.error) {
      mensajeAlerta = <p> {this.state.errorMessage}</p>;
    }

    return (
      <div>

        <Row style={{marginTop:'7%', marginLeft:'0', marginRight:'0', marginBottom:'2%'}} className=''>
          <Col md={4}/>
          <Col md={4} className=''>
              <input
                
                type="text"
                value={this.state.name}
                placeholder="Name and Lastname"
                onChange={this.handleChange}
                name="name"
              />
          </Col>
          <Col md={4}/>
        </Row>

        <Row style={{marginLeft:'0', marginRight:'0', marginBottom:'2%'}} className=''>
          <Col md={4}/>
          <Col md={4} className=''>
              <input
                
                type="email"
                value={this.state.email}
                placeholder="me@email.mx"
                onChange={this.handleChange}
                name="email"
              />
          </Col>
          <Col md={4}/>
        </Row>

        <Row style={{marginLeft:'0', marginRight:'0'}} className=''>
          <Col md={4}/>
          <Col sm={4}>
              <input
                
                type="password"
                value={this.state.password}
                placeholder="***********"
                onChange={this.handleChange}
                name="password"
              />
          </Col>
          <Col md={4}/>
        </Row>
        
        <Row style={{marginLeft:'0', marginRight:'0'}} className=''>
          <Col md={4}/>
          <Col md={2}>
            <button  
              onClick={this.doCreateUserWithEmailAndPassword}>
                <p className="buttonText">
                Sign Up
                </p>
            </button>
          </Col>
          <Col md={2}>
            <button  
              onClick={this.doLoginWithEmailAndPassword}>
                <p className="buttonText">
                Login
                </p>
            </button>
          </Col>
          <Col md={4}/>
        </Row>

        {mensajeAlerta}
      </div>
    );
  }
}

