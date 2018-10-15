import React, { Component } from "react"
import Col from "react-bootstrap/lib/Col"
import Row from "react-bootstrap/lib/Row"
import Card from "react-bootstrap/lib/Card"
import Button from "react-bootstrap/lib/Button"
import Collapse from "react-bootstrap/lib/Collapse"
export default class Part extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }
    copyToClipboard = str => {
        const el = document.createElement("textarea")
        el.value = str
        document.body.appendChild(el)
        el.select()
        document.execCommand("copy")
        document.body.removeChild(el)
    }
    render() {
        const { data, sequence, text } = this.props
        const { open } = this.state
        return (
            <Row className="part-div">
                <Col md="12">
                    <Card>
                        <Card.Header>
                            <p className="lead d-inline-block">
                                {text + ": "}
                                {data && <strong>{data.name}</strong>}
                                {!data && <strong>typed sequence</strong>}
                            </p>
                            <Button
                                onClick={() => this.setState({ open: !open })}
                                aria-controls={`collapsing-text${text}`}
                                aria-expanded={open}
                                variant="secondary"
                                className="float-right">
                                {open && "Close"}
                                {!open && "Open"}
                            </Button>
                            <Button
                                onClick={() => this.copyToClipboard(sequence)}
                                variant="secondary"
                                className="float-right">
                                Copy sequence to clipboard
                            </Button>
                            {data && (
                                <Button
                                    variant="info"
                                    href={`http://parts.igem.org/Part:${
                                        data.name
                                    }`}
                                    className="float-right"
                                    target="_blank">
                                    Open in iGEM
                                </Button>
                            )}
                        </Card.Header>
                        <Collapse in={open}>
                            <Card.Body id={`collapsing-text${text}`}>
                                <blockquote className="blockquote mb-0">
                                    {data &&
                                        Object.entries(data).map((val, idx) => {
                                            return (
                                                <p key={idx}>
                                                    <strong>
                                                        {val[0]
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            val[0].slice(1) +
                                                            ": "}
                                                    </strong>
                                                    {val[0] === "standards"
                                                        ? val[1].join(", ")
                                                        : val[1]}
                                                </p>
                                            )
                                        })}
                                    <p style={{ breakWord: "break-all" }}>
                                        <strong>Sequence:</strong> {sequence}
                                    </p>
                                </blockquote>
                            </Card.Body>
                        </Collapse>
                    </Card>
                </Col>
            </Row>
        )
    }
}
