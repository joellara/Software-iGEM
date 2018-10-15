import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { builderActions } from "../../actions"
//Components
import InfoBar from "../../components/BBBuilder/InfoBar"
import Part from "../../components/BBBuilder/Part"
//Style
import Container from "react-bootstrap/lib/Container"

class ResultBB extends Component {
    constructor(props) {
        super(props)
        this.state = {
            promoter: props.builder.promoter.name
                ? props.builder.promoter.name
                : props.builder.promoter,
            rbs: props.builder.rbs.name
                ? props.builder.rbs.name
                : props.builder.rbs,
            sequence: props.builder.sequence,
            terminator: props.builder.terminator.name
                ? props.builder.terminator.name
                : props.builder.terminator,
            biobrick: ""
        }
    }
    createSequence() {
        const { promoter, rbs, sequence, terminator } = this.state
        if (
            this.state.rbs[0] !== "B" &&
            this.state.promoter[0] !== "B" &&
            this.state.terminator[0] !== "B"
        ) {
            const { rfc } = this.props.builder
            const biobrick = builderActions.createBioBrick(
                rfc,
                promoter,
                rbs,
                sequence,
                terminator
            )
            this.setState({
                biobrick: biobrick
            })
        }
    }
    componentDidMount() {
        const { promoter, rbs, terminator } = this.props.builder
        var atLeastOneBB = false
        if (promoter.name && promoter.name[0] === "B") {
            atLeastOneBB = true
            builderActions.getSequence(promoter.name).then(response => {
                this.setStateSequence(
                    response.data[Object.keys(response.data)[0]].sequence
                        .replace(/\s/g, "")
                        .toUpperCase(),
                    "promoter"
                )
            })
        }
        if (rbs.name && rbs.name[0] === "B") {
            atLeastOneBB = true
            builderActions.getSequence(rbs.name).then(response => {
                this.setStateSequence(
                    response.data[Object.keys(response.data)[0]].sequence
                        .replace(/\s/g, "")
                        .toUpperCase(),
                    "rbs"
                )
            })
        }
        if (terminator.name && terminator.name[0] === "B") {
            atLeastOneBB = true
            builderActions.getSequence(terminator.name).then(response => {
                this.setStateSequence(
                    response.data[Object.keys(response.data)[0]].sequence
                        .replace(/\s/g, "")
                        .toUpperCase(),
                    "terminator"
                )
            })
        }
        if (!atLeastOneBB) {
            this.createSequence()
        }
    }
    setStateSequence = (seq, name) => {
        this.setState(
            {
                [name]: seq
            },
            () => {
                this.createSequence()
            }
        )
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (
            (nextState.rbs.name && nextState.rbs.name[0] === "B") ||
            (nextState.promoter.name && nextState.promoter.name[0] === "B") ||
            (nextState.terminator.name && nextState.terminator.name[0] === "B")
        )
            return false
        return true
    }
    render() {
        const {
            rfc,
            chassis,
            sequence,
            rbs,
            promoter,
            terminator
        } = this.props.builder
        if (!rfc || !chassis) return <Redirect to="/bbbuilder" />
        if (!promoter) return <Redirect to="/bbbuilder/promoter" />
        if (!rbs) return <Redirect to="/bbbuilder/rbs" />
        if (!sequence) return <Redirect to="/bbbuilder/codingsequence" />
        return (
            <Container className="mb-5">
                <InfoBar
                    statusPosition={"Result"}
                    chassis={chassis}
                    rfc={rfc}
                    rbs={rbs.name ? rbs.name : rbs}
                    promoter={promoter.name ? promoter.name : promoter}
                    terminator={terminator.name ? terminator.name : terminator}
                    sequence={sequence}
                />
                <Part
                    data={promoter.name ? promoter : null}
                    sequence={this.state.promoter}
                    text={"Promoter"}
                    className="mb-2"
                />
                <Part
                    data={rbs.name ? rbs : null}
                    sequence={this.state.rbs}
                    className="mb-2"
                    text={"RBS"}
                />
                <Part
                    sequence={sequence}
                    className="mb-2"
                    text={"Coding Sequence"}
                />
                <Part
                    data={terminator.name ? terminator : null}
                    sequence={this.state.terminator}
                    className="mb-2"
                    text={"Terminator"}
                />
                <Part
                    sequence={this.state.biobrick}
                    className="mb-2"
                    text={`Full Biobrick with ${rfc} prefixes, scars and sufixes`}
                />
            </Container>
        )
    }
}

const mapStateToProps = ({ builder }) => ({
    builder
})
export default connect(mapStateToProps)(ResultBB)
