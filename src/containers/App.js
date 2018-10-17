import React, { Component } from "react"
import logo from "../assets/igem_logo.png"; 
import {
    Row,
    Col
} from "react-bootstrap";
class App extends Component {
    render() {
        return (
            <div>
            <Row style={{textAlign:'center', marginTop:'0px'}}>  
                <Col sm={4}/>
                <Col style={{textAlign:'center'}} className='center' sm={4}>
                    <img style={{margin:'5%', borderRadius:'10%', height:'250px'}} src={logo} />           
                </Col>
                <Col sm={4}/>
            </Row>
            <Row style={{textAlign:'center', marginTop:'0px'}}>  
                <Col sm={2}/>
                <Col style={{textAlign:'center'}} className='center' sm={8}>
                    <h1 style={{textAlign:'center'}}>Welcome to TEC CEM 2018's software. Feel free to use it as you please but remember this is still a beta version.</h1>
                </Col>
                <Col sm={2}/>
            </Row>
            </div>
        )

    }
}
export default App
