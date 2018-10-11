import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { Route } from "react-router-dom"
import Promoter from "./BBBuilder/Promoter"
import Base from "./BBBuilder/Base"
import RBS from "./BBBuilder/RBS"
import CodingSequence from "./BBBuilder/CodingSequence"
import Terminators from "./BBBuilder/Terminators"
import ResultBB from "./BBBuilder/ResultBB"
export class BiobrickBuilder extends Component {
    render() {
        const { match } = this.props
        return (
            <div>
                <Route exact path={`${match.url}`} component={Base} />
                <Route path={`${match.url}/promoter`} component={Promoter} />
                <Route path={`${match.url}/rbs`} component={RBS} />
                <Route
                    path={`${match.url}/codingsequence`}
                    component={CodingSequence}
                />
                <Route
                    path={`${match.url}/terminators`}
                    component={Terminators}
                />
                <Route path={`${match.url}/resultbb`} component={ResultBB} />
            </div>
        )
    }
}

export default withRouter(connect()(BiobrickBuilder))
