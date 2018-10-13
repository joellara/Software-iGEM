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
                <p className="lead">
                    <strong>Chassis: </strong> {chassis}
                </p>
            </Col>
            <Col xs="6" md="4">
                <p className="lead">
                    <strong>RFC: </strong>
                    {rfc}
                </p>
            </Col>
            {promoter && (
                <Col xs="6" md="4">
                    <p className="lead">
                        <strong>Promoter: </strong>
                        {promoter.length > 15
                            ? promoter.substring(0, 15) + "..."
                            : promoter}
                    </p>
                </Col>
            )}
            {rbs && (
                <Col xs="6" md="4">
                    <p className="lead">
                        <strong>RBS: </strong>
                        {rbs.length > 15 ? rbs.substring(0, 15) + "..." : rbs}
                    </p>
                </Col>
            )}
            {sequence && (
                <Col xs="6" md="4">
                    <p className="lead">
                        <strong>Sequence: </strong>
                        {sequence.length > 15
                            ? sequence.substring(0, 15) + "..."
                            : sequence}
                    </p>
                </Col>
            )}
            {terminator && (
                <Col xs="6" md="4">
                    <p className="lead">
                        <strong>Terminator: </strong>
                        {terminator.length > 15
                            ? terminator.substring(0, 15) + "..."
                            : terminator}
                    </p>
                </Col>
            )}
        </Row>
    )
}
