import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { Route } from "react-router-dom"
import Promoter from "./BBBuilder/Promoter"
import Base from "./BBBuilder/Base"
export class BiobrickBuilder extends Component {
    render() {
        const { match } = this.props
        return (
            <div>
                <Route exact path={`${match.url}`} component={Base} />
                <Route path={`${match.url}/promoter`} component={Promoter} />
            </div>
        )
    }
}

export default withRouter(connect()(BiobrickBuilder))
