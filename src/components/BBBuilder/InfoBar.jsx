import React from "react"
import Row from "react-bootstrap/lib/Row"
import Col from "react-bootstrap/lib/Col"

export default ({
    statusPosition,
    chassis,
    rfc,
    promoter,
    rbs,
    sequence,
    terminator
}) => {
    return (
        <Row className="justify-content-start align-items-center">
            <Col xs="12" className="mb-3">
                <h1>{statusPosition}</h1>
            </Col>
            <Col xs="6" md="4">
                <h4>
                    <strong>Chassis: </strong> {chassis}
                </h4>
            </Col>
            <Col xs="6" md="4">
                <h4>
                    <strong>RFC: </strong>
                    {rfc}
                </h4>
            </Col>
            {promoter && (
                <Col xs="6" md="4">
                    <h4>
                        <strong>Promoter: </strong>
                        {promoter.length > 15
                            ? promoter.substring(0, 15) + "..."
                            : promoter}
                    </h4>
                </Col>
            )}
            {rbs && (
                <Col xs="6" md="4">
                    <h4>
                        <strong>RBS: </strong>
                        {rbs.length > 15 ? rbs.substring(0, 15) + "..." : rbs}
                    </h4>
                </Col>
            )}
            {sequence && (
                <Col xs="6" md="4">
                    <h4>
                        <strong>Sequence: </strong>
                        {sequence.length > 15
                            ? sequence.substring(0, 15) + "..."
                            : sequence}
                    </h4>
                </Col>
            )}
            {terminator && (
                <Col xs="6" md="4">
                    <h4>
                        <strong>Terminator: </strong>
                        {terminator}
                    </h4>
                </Col>
            )}
        </Row>
    )
}
