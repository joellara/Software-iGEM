import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { promotersRef } from "../../config/firebase"

//Style

import { builderActions } from "../../actions"

//Table
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import filterFactory, {
    textFilter,
    selectFilter
} from "react-bootstrap-table2-filter"

//Style
import "../../css/table.css"
import Container from "react-bootstrap/lib/Container"
import Row from "react-bootstrap/lib/Row"
import Col from "react-bootstrap/lib/Col"
import DropdownButton from "react-bootstrap/lib/DropdownButton"
import Dropdown from "react-bootstrap/lib/Dropdown"
import Button from "react-bootstrap/lib/Button"
import InputGroup from "react-bootstrap/lib/InputGroup"
import FormControl from "react-bootstrap/lib/FormControl"

const selectOptions = {
    Inducible: "Inducible",
    Constitutive: "Constitutive",
    Repressible: "Repressible",
    Multiple: "Multiple"
}
const IN_STOCK = "In stock"
const NOT_IN_STOCK = "Not in stock"
const COMPLICATED = "It's complicated"
const ALL = "All"
const columns = [
    {
        dataField: "name",
        text: "Product Name",
        filter: textFilter(),
        sort: true,
        style: (cell, row, rowIndex, colIndex) => ({
            width: "30%"
        })
    },
    {
        dataField: "desc",
        text: "Product Description",
        filter: textFilter(),
        sort: true,
        style: (cell, row, rowIndex, colIndex) => ({
            width: "30%"
        })
    },
    {
        dataField: "regulation",
        text: "Regulation",
        formatter: cell => selectOptions[cell],
        filter: selectFilter({
            options: selectOptions
        }),
        style: (cell, row, rowIndex, colIndex) => ({
            width: "30%"
        })
    },
    {
        dataField: "status",
        text: "Product Status",
        hidden: true
    },
    {
        dataField: "link",
        isDummyField: true,
        text: "Link to iGEM",
        formatter: (cellContent, row) => {
            return (
                <Button
                    href={`http://parts.igem.org/Part:${row["name"]}`}
                    target="_blank">
                    Link
                </Button>
            )
        },
        style: (cell, row, rowIndex, colIndex) => ({
            width: "10%"
        })
    }
]
const selectRow = {
    mode: "radio",
    clickToSelect: true,
    hideSelectColumn: true,
    bgColor: "#7dc9ff"
}
const paginationOptions = {
    showTotal: true,
    paginationTotalRenderer: (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
            Showing {from} to {to} of {size} Results
        </span>
    )
}
class Promoter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "",
            payload: [],
            filteredPayload: [],
            selectedPromoter: "",
            expanded: [],
            fromLibrary: true
        }
        this.handleClickStatus = this.handleClickStatus.bind(this)
        this.handClickBack = this.handClickBack.bind(this)
        this.handleClickContinue = this.handleClickContinue.bind(this)
        this.toggleLibrary = this.toggleLibrary.bind(this)
        this.handleChangeSequence = this.handleChangeSequence.bind(this)
    }
    handleChangeSequence = event => {
        this.setState({ selectedPromoter: event.target.value })
    }
    handClickBack = () => {
        const { history } = this.props
        history.push("/bbbuilder")
    }
    toggleLibrary = () => {
        const { fromLibrary } = this.state
        this.setState({
            fromLibrary: !fromLibrary
        })
    }
    handleClickContinue = () => {
        const { selectedPromoter } = this.state
        const { dispatch } = this.props
        dispatch(builderActions.selectPromoter(selectedPromoter))
        const { history } = this.props
        history.push("/bbbuilder/rbs")
    }
    handleClickStatus = e => {
        const dataStatus = [ALL, IN_STOCK, NOT_IN_STOCK, COMPLICATED]
        let { rfc, chassis } = this.props.builder
        rfc = rfc.replace(/\s/g, "")
        this.setState({
            filteredPayload: this.state.payload.filter(val => {
                if (dataStatus[e] !== ALL) {
                    return (
                        val["status"] === dataStatus[e] &&
                        val["standards"].indexOf(rfc) > -1 &&
                        val["chassis"] === chassis
                    )
                } else {
                    return (
                        val["standards"].indexOf(rfc) > -1 &&
                        val["chassis"] === chassis
                    )
                }
            }),
            status: dataStatus[e]
        })
    }
    handleOnExpand = (row, isExpand, rowIndex, e) => {
        if (isExpand) {
            this.setState(() => ({
                selectedPromoter: row.name,
                expanded: [row.name]
            }))
        } else {
            this.setState(() => ({
                selectedPromoter: "",
                expanded: []
            }))
        }
    }
    rowStyle = (row, rowIndex) => {
        const style = {}
        if (row["status"] === IN_STOCK) {
            if (row.name === this.state.expanded[0]) {
                style.backgroundColor = "#9eca8d"
            } else {
                style.border = "2px solid #9eca8d"
            }
        } else if (row["status"] === NOT_IN_STOCK) {
            if (row.name === this.state.expanded[0]) {
                style.backgroundColor = "#f38484"
            } else {
                style.border = "2px solid #f38484"
            }
        } else if (row["status"] === COMPLICATED) {
            if (row.name === this.state.expanded[0]) {
                style.backgroundColor = "rgb(255, 217, 30)"
            } else {
                style.border = "2px solid rgb(255, 217, 30)"
            }
        }

        return style
    }
    componentDidMount() {
        let {
            builder: { rfc, chassis }
        } = this.props
        rfc = rfc.replace(/\s/g, "")
        promotersRef.on("value", snapshot => {
            this.setState(() => ({
                ...this.state,
                payload: snapshot.val(),
                filteredPayload: snapshot.val().filter(val => {
                    return (
                        val["standards"].indexOf(rfc) > -1 &&
                        val["chassis"] === chassis
                    )
                })
            }))
        })
    }
    render() {
        const {
            filteredPayload,
            status,
            expanded,
            fromLibrary,
            selectedPromoter
        } = this.state
        const { rfc, chassis } = this.props.builder
        if (!rfc || !chassis) return <Redirect to="/bbbuilder" />
        const expandRow = {
            renderer: row => (
                <div>
                    <p>Sample status: {`${row["status"]}`}</p>
                    <p>Length: {`${row["length"]}`}</p>
                </div>
            ),
            expanded: expanded,
            onExpand: this.handleOnExpand
        }
        return (
            <Container>
                <Row className="my-3">
                    <Col className="d-flex justify-content-between">
                        <Button onClick={this.handClickBack}>
                            Go back to Chassis & RFC selection
                        </Button>
                        <Button variant="warning" onClick={this.toggleLibrary}>
                            {fromLibrary && "Insert your own sequence"}
                            {!fromLibrary && "Select from the library"}
                        </Button>
                        <Button
                            variant="success"
                            onClick={this.handleClickContinue}
                            disabled={selectedPromoter === ""}>
                            Select promoter
                        </Button>
                    </Col>
                </Row>
                <Row className="justify-content-center align-items-center">
                    <Col xs="12" md="2" className="mb-3">
                        <h1>Promoter</h1>
                    </Col>
                    <Col xs="12" md="3">
                        <h5>
                            <strong>Chassis: </strong> {chassis}
                        </h5>
                    </Col>
                    <Col xs="12" md="2">
                        <h5>
                            <strong>RFC: </strong>
                            {rfc}
                        </h5>
                    </Col>
                    {fromLibrary && (
                        <React.Fragment>
                            <Col xs="12" md="3">
                                <h5 className="mr-5">
                                    <strong>Status: </strong>
                                    {status || "All"}
                                </h5>
                            </Col>
                            <Col xs="12" md="2" className="text-right">
                                <DropdownButton
                                    id="dropdown-status-promoter"
                                    title="Status">
                                    <Dropdown.Item
                                        eventKey="0"
                                        onSelect={this.handleClickStatus}>
                                        All
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="1"
                                        onSelect={this.handleClickStatus}>
                                        In stock
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="2"
                                        onSelect={this.handleClickStatus}>
                                        Not in stock
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="3"
                                        onSelect={this.handleClickStatus}>
                                        It's complicated
                                    </Dropdown.Item>
                                </DropdownButton>
                            </Col>
                        </React.Fragment>
                    )}
                </Row>
                {fromLibrary && (
                    <Row>
                        <Col xs="12">
                            {filteredPayload && (
                                <BootstrapTable
                                    keyField="name"
                                    columns={columns}
                                    data={filteredPayload}
                                    pagination={paginationFactory(
                                        paginationOptions
                                    )}
                                    filter={filterFactory()}
                                    bootstrap4={true}
                                    rowStyle={this.rowStyle}
                                    expandRow={expandRow}
                                    selectRow={selectRow}
                                />
                            )}
                        </Col>
                    </Row>
                )}
                {!fromLibrary && (
                    <Row>
                        <Col>
                            <h1>Insert your own sequence </h1>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-sequence">
                                        Sequence
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    value={selectedPromoter}
                                    onChange={this.handleChangeSequence}
                                    placeholder="Sequence"
                                    aria-label="sequence"
                                    aria-describedby="basic-sequence"
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                )}
            </Container>
        )
    }
}

const mapStateToProps = ({ builder }) => ({
    builder
})
export default connect(mapStateToProps)(Promoter)
