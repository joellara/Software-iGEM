import React from "react"
import DropdownButton from "react-bootstrap/lib/DropdownButton"
import Dropdown from "react-bootstrap/lib/Dropdown"
import Col from "react-bootstrap/lib/Col"
export default ({ val, handler }) => {
    return (
        <Col className="text-right" md="4" xs="12">
            <h5 className="d-inline-block mr-3">
                <strong>Sample status:</strong>
            </h5>
            <DropdownButton
                alignRight
                id="dropdown-status-promoter"
                className="d-inline-block"
                title={val || "All"}>
                <Dropdown.Item eventKey="0" onSelect={handler}>
                    All
                </Dropdown.Item>
                <Dropdown.Item eventKey="1" onSelect={handler}>
                    In stock
                </Dropdown.Item>
                <Dropdown.Item eventKey="2" onSelect={handler}>
                    Not in stock
                </Dropdown.Item>
                <Dropdown.Item eventKey="3" onSelect={handler}>
                    It's complicated
                </Dropdown.Item>
            </DropdownButton>
        </Col>
    )
}
