import React from "react"
import Row from "react-bootstrap/lib/Row"
import Col from "react-bootstrap/lib/Col"
import InputGroup from "react-bootstrap/lib/InputGroup"
import FormControl from "react-bootstrap/lib/FormControl"
function normalizeText(event) {
    return event.target.value.replace(/[^ACGTacgt]/g, "").toUpperCase()
}
export default ({ val, handler }) => {
    return (
        <Row>
            <Col md={{ span: 10, offset: 1 }}>
                <h2>Insert your own sequence </h2>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-sequence">
                            Sequence
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        value={val}
                        onChange={e => {
                            handler(normalizeText(e))
                        }}
                        placeholder="Sequence"
                        aria-label="sequence"
                        aria-describedby="basic-sequence"
                    />
                </InputGroup>
            </Col>
        </Row>
    )
}
