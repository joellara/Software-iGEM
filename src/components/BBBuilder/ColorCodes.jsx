import React from "react"
import Col from "react-bootstrap/lib/Col"
const ColorCodes = () => {
    return (
        <Col xs="12" className="color-codes">
            <p className="lead">
                <strong>Color codes:</strong>
            </p>
            <p>
                <strong>In stock: </strong>
                <span className="color-code green" />
            </p>
            <p>
                <strong>Complicated: </strong>
                <span className="color-code yellow" />
            </p>
            <p>
                <strong>Not in stock: </strong>
                <span className="color-code red" />
            </p>
        </Col>
    )
}

export default ColorCodes
