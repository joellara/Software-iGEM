import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
//Components
import RadioSelectionGroup from "../../components/RadioSelectionGroup"
//Redux
import { RFCs, Chassis } from "../../constants"
import { builderActions } from "../../actions"
//Style
import Container from "react-bootstrap/lib/Container"
import Row from "react-bootstrap/lib/Row"
import Col from "react-bootstrap/lib/Col"
import Card from "react-bootstrap/lib/Card"
import CardDeck from "react-bootstrap/lib/CardDeck"
import Button from "react-bootstrap/lib/Button"

import "../../css/bbbuilder.css"

export class Base extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shouldContinue: false
        }
        this.onClick = this.onClick.bind(this)
    }
    handleClickRFC = id => {
        const { dispatch } = this.props
        dispatch(builderActions.selectRFC(id))
    }
    handleClickChassis = id => {
        const { dispatch } = this.props
        dispatch(builderActions.selectChassis(id))
    }
    onClick() {
        this.setState({
            shouldContinue: true
        })
    }
    render() {
        const {
            valid,
            builder: { rfc, chassis }
        } = this.props
        const { shouldContinue } = this.state
        if (shouldContinue) {
            return <Redirect to={`bbbuilder/promoter`} />
        }
        return (
            <Container id="initialSelection">
                <Row>
                    <CardDeck style={{ width: "100%" }} className="mb-3">
                        <Col md="6">
                            <Card className="h-100">
                                <Card.Body>
                                    <Card.Title>RFC Standard</Card.Title>
                                    <Card.Text as="div">
                                        <RadioSelectionGroup
                                            listData={RFCs}
                                            stateData={rfc}
                                            _function={this.handleClickRFC}
                                            _name="RFC"
                                        />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md="6">
                            <Card className="h-100">
                                <Card.Body>
                                    <Card.Title>Chassis</Card.Title>
                                    <Card.Text as="div">
                                        <RadioSelectionGroup
                                            listData={Chassis}
                                            stateData={chassis}
                                            _function={this.handleClickChassis}
                                            _name="Chassis"
                                        />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </CardDeck>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-end" md="11">
                        <Button
                            onClick={this.onClick}
                            disabled={!valid}
                            to="/activitylog">
                            Continuar
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    ...state,
    valid: state.builder.rfc !== "" && state.builder.chassis !== ""
})
export default connect(mapStateToProps)(Base)
