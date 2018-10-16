/* eslint-disable no-undef */

import React, { Component } from "react";
import {
  Row,
  Col
} from "react-bootstrap";
import Button from "react-bootstrap/lib/Button"
import tipo_cero from "../assets/big.jpeg"; 
import tipo_uno from "../assets/small.JPG"; 

class Count extends Component {
  constructor(props){
    super(props);
    this.state = {
      file: null,
      cells:'',
      type:-1
    }
    this.handleDoc = this.handleDoc.bind(this);
    this.sendToServer = this.sendToServer.bind(this);
  }

  handleDoc(e){
    
    var file = e.target.files;
    
    this.setState({file:file[0]});
  }

  handleChange(evt) {
    
    this.setState({ tabla:evt.target.value });
  }

  selectType(type){
    debugger;
    this.setState({type:type});
  }

  sendToServer(){
    
    let _this=this;
    
    var formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("name",'temp');

    debugger;

    if(this.state.type===-1){
      alert("Please select an option");
    }else if(this.state.type===0){
      //fetch("http://igem-2018-tec.herokuapp.com/large", {
      fetch("http://localhost:5000/large",{
          method: "post",
          body: formData
      }).then(res => res.json()).then(res => {
        debugger;
        if(res.status<400&&res.status>=200){
          alert("Image sent.");
          _this.setState({file:null, cells:res.cells});
        }else{
          alert("Error, please try later.");
        }
      });
    }else{
      //fetch("http://igem-2018-tec.herokuapp.com/large", {
        fetch("http://localhost:5000/short",{
          method: "post",
          body: formData
      }).then(res => res.json()).then(res => {
        debugger;
        if(res.status<400&&res.status>=200){
          alert("Image sent.");
          _this.setState({file:null, cells:res.cells});
        }else{
          alert("Error, please try later.");
        }
      });
    }

    
  }

  render() {
    return(
      <div>

      <Row style={{textAlign:'center', marginTop:'10px'}}>  
          <Col sm={3}/>
          <Col style={{textAlign:'center'}} className='center' sm={6}>
            <span style={{textAlign:'center'}} style={{display:"block"}}><span style={{color:"#9b9b9b", fontSize:"1.5em", fontWeight:"bold"}}>Choose the type of cells you want to count:</span></span>
          </Col>
          <Col sm={3}/>
      </Row>

      <Row style={{textAlign:'center', marginTop:'0px'}}>  
          <Col sm={3}/>
          <Col style={{textAlign:'center'}} className='center' sm={3}>
            <img style={{margin:'5%', borderRadius:'10%', height:'250px'}} src={tipo_cero} />           
          </Col>

          <Col style={{textAlign:'center'}} className='center' sm={3}>
            <img style={{margin:'5%', borderRadius:'10%', height:'250px'}} src={tipo_uno} />           
          </Col>
          <Col sm={3}/>
      </Row>

      <Row style={{textAlign:'center', marginTop:'0px'}}>  
          <Col sm={3}/>

          <Col style={{textAlign:'center'}} className='center' sm={3}>
            {this.state.type===0?<Button style={{width:'200px', background:'#7194ba'}} onClick={()=>this.selectType(0)}>
              This
            </Button>:
            <Button style={{width:'200px'}} onClick={()=>this.selectType(0)}>
              This
            </Button>}            
          </Col>


          <Col style={{textAlign:'center'}} className='center' sm={3}>
            {this.state.type===1?<Button style={{width:'200px', background:'#7194ba'}} onClick={()=>this.selectType(1)}>
              Or this
            </Button>:
            <Button style={{width:'200px'}} onClick={()=>this.selectType(1)}>
              Or this
            </Button>}  
          </Col>

          <Col sm={3}/>
      </Row>

      <Row style={{margin:'0', textAlign:'center', marginTop:'20px'}} className='center'>
        <Col sm={2}/>
        <Col sm={8}>
        <div style={{padding:'2px', textAlign:'center', border: '1px solid rgba(0,0,0,.125)', borderRadius:'2px',margin:'10px'}}>

          <Row style={{textAlign:'center', marginTop:'10px'}}>
            
              <Col sm={4}/>
              <Col style={{textAlign:'center'}} className='center' sm={4}>
                <input type="file" id={"input"}  style={{display:"none"}} onChange={ e => this.handleDoc(e)}/>
                <label style={{textAlign:'center'}} className={this.state.file !== null ? "fileArriba": null} htmlFor={"input"} style={{display:"block"}}><span style={{color:"#9b9b9b", fontSize:"1.1em", fontWeight:"bold", cursor:'pointer'}}>Click here to select picture you want to process</span></label>
              </Col>
              <Col sm={4}/>
            
          </Row>

          <Row style={{margin:'2%', textAlign:'center'}} >
            
            <Col sm={1}/>
            <Col className='center' sm={10}>
              <Button className="" onClick={this.sendToServer}>
                Process Image
              </Button>
            </Col>
            <Col sm={1}/>
            
          </Row>
        </div>
        </Col>
        <Col sm={2}/>

      </Row>
      <Row style={{textAlign:'center', marginTop:'20px'}}>  
          <Col sm={4}/>
          <Col style={{textAlign:'center'}} className='center' sm={4}>
            
            <span style={{textAlign:'center'}} style={{display:"block"}}><span style={{color:"#9b9b9b", fontSize:"2.1em", fontWeight:"bold"}}>{this.state.cells != '' ? 'Cells counted:':''}</span></span>
          </Col>
          <Col sm={4}/>
      </Row>
      <Row style={{textAlign:'center', marginTop:'20px'}}>  
          <Col sm={4}/>
          <Col style={{textAlign:'center'}} className='center' sm={4}>
            
            <span style={{textAlign:'center'}} style={{display:"block"}}><span style={{color:"#9b9b9b", fontSize:"2.1em", fontWeight:"bold"}}>{this.state.cells}</span></span>
          </Col>
          <Col sm={4}/>
      </Row>
      </div>
    ) 
  }
}

export default Count;
