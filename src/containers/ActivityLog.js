import React, { Component } from "react";
import {
  Col,
  Button,
  Row,
} from "react-bootstrap";
import firebase from 'firebase';

const id = 15375126592990222;

class CellCount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data:{},
      yearData:{},
      monthData:{},
      dayData:{}
    };
    this.getData();
    this.selectYear = this.selectYear.bind(this);
    this.selectMonth = this.selectMonth.bind(this);
    this.selectDay = this.selectDay.bind(this);
  } 

  getData(){
    let data = {};
    firebase.database().ref(id+'/color/').once("value").then(snapshot => {
      data = snapshot.val();
      this.setState({data:data});
    });
  }

  selectYear(year){
    debugger;
    this.setState({yearData:this.state.data[year]});
  }

  selectMonth(month){
    debugger;
    this.setState({monthData:this.state.yearData[month]});
  }

  selectDay(day){
    debugger;
    this.setState({dayData:this.state.monthData[day]});
  }

  render() {
    const years = Object.keys(this.state.data).map((el, idx) => (
      <Button onClick={()=>this.selectYear(el)} key={idx} className="column-scroll center" md={3}>
        {el}
      </Button>
    ));

    const months = Object.keys(this.state.yearData).map((el, idx) => (
      <Button onClick={()=>this.selectMonth(el)} key={idx} className="column-scroll center" md={3}>
        {el}
      </Button>
    ));

    const days = Object.keys(this.state.monthData).map((el, idx) => (
      <Button onClick={()=>this.selectDay(el)} key={idx} className="column-scroll center" md={3}>
        {el}
      </Button>
    ));

    const hours = Object.keys(this.state.dayData).map((el, idx) => (
      <tr>
        <td  style={{ textAlign: "center", border:' 1px solid black' }}>
          {el}
        </td>
        <td  style={{ textAlign: "center", border:' 1px solid black' }}>
          {this.state.dayData[el].data}
        </td>
      </tr>
    ));

    return (
    <div>
      <Row style={{margin:'0'}}>
        {years}
      </Row>
      <Row style={{margin:'0'}}>
        {months}
      </Row>
      <Row style={{margin:'0'}}>
        {days}
      </Row>
      <table style={{margin:'15px'}}>
        <tbody>
          {hours}
        </tbody>
      </table>
    </div>
    );
  }
}

export default CellCount;
