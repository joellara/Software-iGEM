import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router"
import Container from "react-bootstrap/lib/Container"
import Row from "react-bootstrap/lib/Row"
import Col from "react-bootstrap/lib/Col"
import Table from "react-bootstrap/lib/Table"
import Button from "react-bootstrap/lib/Button"
import firebase from "firebase"
import SelectProject from "./SelectProject"
import { projectActions } from "../actions"

import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line
} from "recharts"

class ActivityLog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {},
            year: "",
            month: "",
            day: "",
            yearData: {},
            monthData: {},
            dayData: {},
            dataToGraph: [],
            gotData: false
        }
        this.selectYear = this.selectYear.bind(this)
        this.selectMonth = this.selectMonth.bind(this)
        this.selectDay = this.selectDay.bind(this)
        this.selectProject = this.selectProject.bind(this)
        this.getDataToPlot = this.getDataToPlot.bind(this)
    }

    getData() {
        /*  var separators = [' ', '-', ':'];
    var str = "R:%i,G:%i,B:%i";
    var res = str.split(new RegExp(separators.join('|'), 'g')); */
        const { PUID } = this.props.project
        firebase
            .database()
            .ref("data/" + PUID)
            .once("value")
            .then(snapshot => {
                this.setState({ data: snapshot.val(), gotData: true }, () => {
                    this.getDataToPlot("all")
                })
            })
    }

    getDataToPlot(timePeriod) {
        let dataToPlott = []
        if (timePeriod == "all") {
            for (var year in this.state.data) {
                for (var month in this.state.data[year]) {
                    for (var day in this.state.data[year][month]) {
                        for (var hour in this.state.data[year][month][day]) {
                            dataToPlott.push({
                                x: month + "-" + day + "-" + hour,
                                value:
                                    ((this.state.data[year][month][day][hour]
                                        .R <<
                                        (6 +
                                            this.state.data[year][month][day][
                                                hour
                                            ].G)) <<
                                        (3 +
                                            this.state.data[year][month][day][
                                                hour
                                            ].B)) /
                                    1000000,
                                temp:
                                    10 *
                                    parseFloat(
                                        this.state.data[year][month][day][hour]
                                            .T
                                    ),
                                CO2:
                                    100 *
                                    parseFloat(
                                        this.state.data[year][month][day][hour]
                                            .C
                                    )
                            })
                        }
                    }
                }
            }
        } else if (timePeriod == "year") {
            let year = this.state.year
            for (var month in this.state.data[year]) {
                for (var day in this.state.data[year][month]) {
                    for (var hour in this.state.data[year][month][day]) {
                        dataToPlott.push({
                            x: month + "-" + day + "-" + hour,
                            value:
                                ((this.state.data[year][month][day][hour].R <<
                                    (6 +
                                        this.state.data[year][month][day][hour]
                                            .G)) <<
                                    (3 +
                                        this.state.data[year][month][day][hour]
                                            .B)) /
                                1000000,
                            temp:
                                10 *
                                parseFloat(
                                    this.state.data[year][month][day][hour].T
                                ),
                            CO2:
                                100 *
                                parseFloat(
                                    this.state.data[year][month][day][hour].C
                                )
                        })
                    }
                }
            }
        } else if (timePeriod == "month") {
            let year = this.state.year
            let month = this.state.month

            for (var day in this.state.data[year][month]) {
                for (var hour in this.state.data[year][month][day]) {
                    dataToPlott.push({
                        x: month + "-" + day + "-" + hour,
                        value:
                            ((this.state.data[year][month][day][hour].R <<
                                (6 +
                                    this.state.data[year][month][day][hour]
                                        .G)) <<
                                (3 +
                                    this.state.data[year][month][day][hour]
                                        .B)) /
                            1000000,
                        temp:
                            10 *
                            parseFloat(
                                this.state.data[year][month][day][hour].T
                            ),
                        CO2:
                            100 *
                            parseFloat(
                                this.state.data[year][month][day][hour].C
                            )
                    })
                }
            }
        } else {
            let year = this.state.year
            let month = this.state.month
            let day = this.state.day

            for (var hour in this.state.data[year][month][day]) {
                dataToPlott.push({
                    x: month + "-" + day + "-" + hour,
                    value:
                        ((this.state.data[year][month][day][hour].R <<
                            (6 + this.state.data[year][month][day][hour].G)) <<
                            (3 + this.state.data[year][month][day][hour].B)) /
                        1000000,
                    temp:
                        10 *
                        parseFloat(this.state.data[year][month][day][hour].T),
                    CO2:
                        100 *
                        parseFloat(this.state.data[year][month][day][hour].C)
                })
            }
        }
        this.setState({ dataToGraph: dataToPlott })
    }

    selectYear(year) {
        this.setState({ yearData: this.state.data[year], year: year }, () =>
            this.getDataToPlot("year")
        )
    }

    selectMonth(month) {
        this.setState(
            { monthData: this.state.yearData[month], month: month },
            () => this.getDataToPlot("month")
        )
    }

    selectDay(day) {
        this.setState({ dayData: this.state.monthData[day], day: day }, () =>
            this.getDataToPlot("lol")
        )
    }
    selectProject(selectedProject) {
        const { dispatch } = this.props
        this.setState(
            {
                gotData: false,
                data: []
            },
            () => {
                dispatch(projectActions.selectProject(selectedProject))
            }
        )
    }
    render() {
        const {
            auth: { UID }
        } = this.props
        if (!UID) {
            return <Redirect to="/" />
        }
        if (!this.state.gotData && this.props.project.PUID) {
            this.getData()
        }
        const years = this.state.data
            ? Object.keys(this.state.data).map((el, idx) => (
                  <Col sm={1} key={idx}>
                      <Button
                          style={{ width: "100%" }}
                          onClick={() => this.selectYear(el)}
                          className=""
                          md={3}>
                          {el}
                      </Button>
                  </Col>
              ))
            : null

        const months = Object.keys(this.state.yearData).map((el, idx) => (
            <Col sm={1}>
                <Button
                    style={{ width: "100%" }}
                    onClick={() => this.selectMonth(el)}
                    key={idx}
                    className=""
                    md={3}>
                    {el}
                </Button>
            </Col>
        ))

        const days = Object.keys(this.state.monthData).map((el, idx) => (
            <Col sm={1}>
                <Button
                    style={{ width: "100%" }}
                    onClick={() => this.selectDay(el)}
                    key={idx}
                    className=""
                    md={3}>
                    {el}
                </Button>
            </Col>
        ))

        const hours = this.state.dataToGraph
            ? this.state.dataToGraph.map((el, idx) => (
                  <tr>
                      <td
                          style={{
                              textAlign: "center",
                              border: " 1px solid black"
                          }}>
                          {el.x}
                      </td>
                      <td
                          style={{
                              textAlign: "center",
                              border: " 1px solid black"
                          }}>
                          {el.value}
                      </td>
                      <td
                          style={{
                              textAlign: "center",
                              border: " 1px solid black"
                          }}>
                          {el.temp / 10}
                      </td>
                      <td
                          style={{
                              textAlign: "center",
                              border: " 1px solid black"
                          }}>
                          {el.CO2 / 100}
                      </td>
                  </tr>
              ))
            : null
        return (
            <React.Fragment>
                <SelectProject handleSelectProject={this.selectProject} />
                {this.props.project.PUID && (
                    <Container>
                        <Row style={{ margin: "0", marginBottom: "20px" }}>
                            <Col sm={2}>
                                <h4>Filter your logs:</h4>
                            </Col>
                        </Row>
                        <Row style={{ margin: "0" }}>
                            <Col style={{ marginTop: "20px" }} sm={2}>
                                <h5>Year:</h5>
                            </Col>
                        </Row>
                        <Row style={{ margin: "0" }}>{years}</Row>

                        {months.length > 0 ? (
                            <Row style={{ margin: "0" }}>
                                <Col style={{ marginTop: "20px" }} sm={2}>
                                    <h5>Month:</h5>
                                </Col>
                            </Row>
                        ) : null}
                        <Row style={{ margin: "0" }}>{months}</Row>

                        {days.length > 0 ? (
                            <Row style={{ margin: "0" }}>
                                <Col style={{ marginTop: "20px" }} sm={2}>
                                    <h5>Days:</h5>
                                </Col>
                            </Row>
                        ) : null}
                        <Row style={{ margin: "0" }}>{days}</Row>

                        <Row
                            style={{
                                textAlign: "center",
                                margin: "0px",
                                marginTop: "2rem",
                                marginBottom: "2rem"
                            }}>
                            <Col style={{ textAlign: "center" }} sm={12}>
                                <LineChart
                                    width={window.innerWidth / 1.3}
                                    height={300}
                                    data={this.state.dataToGraph}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5
                                    }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="x" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#8884d8"
                                    />
                                    <Line
                                        type="monotone"
                                        name="Temp. C (x10)"
                                        dataKey="temp"
                                        stroke="#82ca9d"
                                    />
                                    <Line
                                        type="monotone"
                                        name="CO2 % (x100)"
                                        dataKey="CO2"
                                        stroke="#82c44d"
                                    />
                                </LineChart>
                            </Col>
                        </Row>

                        <Table striped bordered condensed hover>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Value</th>
                                    <th>Temperature (°C)</th>
                                    <th>CO2 (%)</th>
                                </tr>
                            </thead>
                            <tbody>{hours}</tbody>
                        </Table>
                    </Container>
                )}
            </React.Fragment>
        )
    }
}
const mapStateToProps = ({ auth, project }) => ({
    auth,
    project
})
export default connect(mapStateToProps)(ActivityLog)
