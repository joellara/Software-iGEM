import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { builderActions } from "../../actions"
//Components
import InfoBar from "../../components/BBBuilder/InfoBar"
import InputSequence from "../../components/BBBuilder/InputSequence"
//Style
import Container from "react-bootstrap/lib/Container"
import Row from "react-bootstrap/lib/Row"
import Col from "react-bootstrap/lib/Col"
import Button from "react-bootstrap/lib/Button"

class CodingSequence extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sequence: ""
        }
        this.handleTypeSequence = this.handleTypeSequence.bind(this)
        this.handClickBack = this.handClickBack.bind(this)
        this.handleClickContinue = this.handleClickContinue.bind(this)
    }
    handleClickContinue = () => {
        const { sequence } = this.state
        const { dispatch } = this.props
        dispatch(builderActions.selectSequence(sequence))
        const { history } = this.props
        history.push("/bbbuilder/terminators")
    }
    handClickBack = () => {
        const { history } = this.props
        history.push("/bbbuilder/rbs")
    }
    handleTypeSequence = event => {
        this.setState({ sequence: event.target.value })
    }
    render() {
        const { rfc, chassis, promoter, rbs } = this.props.builder
        const { sequence } = this.state
        if (!rfc || !chassis) return <Redirect to="/bbbuilder" />
        if (!promoter) return <Redirect to="/bbbuilder/promoter" />
        if (!rbs) return <Redirect to="/bbbuilder/rbs" />
        return (
            <Container className="mb-5">
                <InfoBar
                    statusPosition={"Coding Sequence"}
                    chassis={chassis}
                    rfc={rfc}
                    promoter={promoter.name}
                    rbs={rbs.name}
                />
                <Row className="my-3">
                    <Col className="d-flex justify-content-between">
                        <Button onClick={this.handClickBack}>
                            Go back to RBS selection
                        </Button>
                    </Col>
                </Row>
                <InputSequence
                    val={sequence}
                    handler={this.handleTypeSequence}
                />
                <Row>
                    <Col className="text-right">
                        <Button
                            variant="success"
                            onClick={this.handleClickContinue}
                            disabled={sequence === ""}>
                            Add Coding Sequence
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}
const mapStateToProps = ({ builder }) => ({
    builder
})
export default connect(mapStateToProps)(CodingSequence)
