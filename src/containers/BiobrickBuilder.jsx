import React, { Component } from "react"
import { connect } from "react-redux"
import Promoter from "./BBBuilder/Promoter"

export class BiobrickBuilder extends Component {
    render() {
        return <Promoter />
    }
}

export default connect()(BiobrickBuilder)