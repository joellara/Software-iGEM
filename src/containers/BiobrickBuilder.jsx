import React, { Component } from "react"
import { connect } from "react-redux"
//import Promoter from "./BBBuilder/Promoter"
import Base from "./BBBuilder/Base"
export class BiobrickBuilder extends Component {
    render() {
        return <Base />
    }
}

export default connect()(BiobrickBuilder)
