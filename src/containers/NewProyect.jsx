import React, { Component } from "react";
import { Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import firebase from 'firebase';
import '../App.css'

export default class NewProyect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.createProyect = this.createProyect.bind(this);
  }

  // Sign Up
  createProyect() {
    let _this = this;
    let user = firebase.auth().currentUser;
    firebase.database().ref('users/'+user.uid+'/proyects').update({
      [_this.state.code]:'active'
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

    var x = 30;
    var y = 48;
    var z = 174;

    var res = (x<<6)+(y<<3)+(z) 
    debugger;

    return (
      <div>

        <Row style={{marginTop:'7%', marginLeft:'0', marginRight:'0', marginBottom:'2%'}} className=''>
          <Col md={4}/>
          <Col md={4} className=''>
              <input
                style={{width:'100%', borderRadius:'10px'}}
                type="text"
                value={this.state.name}
                placeholder="Name your proyect"
                onChange={this.handleChange}
                name="name"
              />
          </Col>
          <Col md={4}/>
        </Row>

        <Row style={{marginLeft:'0', marginRight:'0'}} className=''>
          <Col md={4}/>
          <Col sm={4}>
              <input
                style={{width:'100%', borderRadius:'10px'}}
                type="text"
                value={this.state.code}
                placeholder="i.e. 1729273982932"
                onChange={this.handleChange}
                name="code"
              />
          </Col>
          <Col md={4}/>
        </Row>
        
        <Row style={{marginLeft:'0', marginRight:'0'}} className=''>
          <Col md={4}/>
          <Col md={1}/>
          <Col md={2}>
            <button  
              style={{width:'100%', borderRadius:'10px'}}
              onClick={this.doCreateUserWithEmailAndPassword}>
                <p style={{color:'white', fontWeight:'bold', margin:'0'}} className="buttonText">
                Register
                </p>
            </button>
          </Col>
          <Col md={5}/>
        </Row>

        {mensajeAlerta}
      </div>
    );
  }
}

