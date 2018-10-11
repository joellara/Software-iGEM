import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { builderActions } from "../../actions"
//Components
import InfoBar from "../../components/BBBuilder/InfoBar"

//Style
import Container from "react-bootstrap/lib/Container"
import Row from "react-bootstrap/lib/Row"
import Col from "react-bootstrap/lib/Col"

class ResultBB extends Component {
    constructor(props) {
        super(props)
        this.state = {
            promoter: props.builder.promoter,
            rbs: props.builder.rbs,
            sequence: props.builder.sequence,
            terminator: props.builder.terminator,
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
            console.log("Time to create biobrick")

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
        if (promoter[0] === "B") {
            builderActions.getSequence(promoter).then(response => {
                this.setStateSequence(
                    response.data[Object.keys(response.data)[0]].sequence
                        .replace(/\s/g, "")
                        .toUpperCase(),
                    "promoter"
                )
            })
        }
        if (rbs[0] === "B") {
            builderActions.getSequence(rbs).then(response => {
                this.setStateSequence(
                    response.data[Object.keys(response.data)[0]].sequence
                        .replace(/\s/g, "")
                        .toUpperCase(),
                    "rbs"
                )
            })
        }
        if (terminator[0] === "B") {
            builderActions.getSequence(terminator).then(response => {
                this.setStateSequence(
                    response.data[Object.keys(response.data)[0]].sequence
                        .replace(/\s/g, "")
                        .toUpperCase(),
                    "terminator"
                )
            })
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
            nextState.rbs[0] === "B" ||
            nextState.promoter[0] === "B" ||
            nextState.terminator[0] === "B"
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
            <Container>
                <InfoBar
                    statusPosition={"Result"}
                    chassis={chassis}
                    rfc={rfc}
                    promoter={promoter}
                    rbs={rbs}
                    sequence={sequence}
                    terminator={terminator}
                />
                <Row>
                    <Col>
                        {this.state.biobrick && <p>{this.state.biobrick}</p>}
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = ({ builder }) => ({
    builder
})
export default connect(mapStateToProps)(ResultBB)
