import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { rbsRef } from "../../config/firebase"

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
    ConstitutiveAndersonLibrary: "Constitutive Anderson",
    ConstitutiveCommunityCollection: "Constitutive Community",
    RegulatedProkaryotic: "Regulated Prokaryotic",
    ConstitutiveCustom: "Constitutive Custom",
    Yeast: "Yeast"
}

const IN_STOCK = "In stock"
const NOT_IN_STOCK = "Not in stock"
const COMPLICATED = "It's complicated"
const ALL = "All"
const PROKARYOTE = "Prokaryotic"
const EUKARYOTIC = "Eukaryotic"

const columns = [
    {
        dataField: "name",
        text: "Product Name",
        filter: textFilter(),
        sort: true,
        style: (cell, row, rowIndex, colIndex) => ({
            width: "20%"
        })
    },
    {
        dataField: "description",
        text: "Product Description",
        filter: textFilter(),
        sort: true,
        style: (cell, row, rowIndex, colIndex) => ({
            width: "30%"
        })
    },
    {
        dataField: "type",
        text: "Category",
        formatter: cell => selectOptions[cell],
        filter: selectFilter({
            options: selectOptions
        }),
        style: (cell, row, rowIndex, colIndex) => ({
            width: "<i class='fa fa-battery-2' aria-hidden='true'></i>0%"
        })
    },
    {
        dataField: "strength",
        text: "Strength",
        sort: true,
        style: (cell, row, rowIndex, colIndex) => ({
            width: "20%"
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
            type: "",
            payload: [],
            filteredPayload: [],
            selectedRBS: "",
            typedRBS: "",
            expanded: [],
            fromLibrary: true
        }
        this.handleSelectStatus = this.handleSelectStatus.bind(this)
        this.handleSelectType = this.handleSelectType.bind(this)
        this.handClickBack = this.handClickBack.bind(this)
        this.handleClickContinue = this.handleClickContinue.bind(this)
        this.toggleLibrary = this.toggleLibrary.bind(this)
        this.handleChangeSequence = this.handleChangeSequence.bind(this)
    }
    handleChangeSequence = event => {
        this.setState({ typedRBS: event.target.value })
    }
    handClickBack = () => {
        const { history } = this.props
        history.push("/bbbuilder/promoter")
    }
    toggleLibrary = () => {
        const { fromLibrary } = this.state
        if (fromLibrary) {
            this.setState({
                fromLibrary: !fromLibrary,
                typed: ""
            })
        } else {
            this.setState({
                fromLibrary: !fromLibrary,
                selectedRBS: "",
                expanded: []
            })
        }
    }
    handleClickContinue = () => {
        const { selectedRBS } = this.state
        const { dispatch } = this.props
        dispatch(builderActions.selectRBS(selectedRBS))
        const { history } = this.props
        history.push("/bbbuilder/codingsequence")
    }
    handleSelectType = e => {
        const dataStatus = [ALL, PROKARYOTE, EUKARYOTIC]

        let { rfc } = this.props.builder
        rfc = rfc.replace(/\s/g, "")

        this.setState({
            filteredPayload: this.state.payload.filter(val => {
                if (dataStatus[e] !== ALL) {
                    return (
                        val["chassis"] === dataStatus[e] &&
                        val["standards"].indexOf(rfc) > -1
                    )
                } else {
                    return val["standards"].indexOf(rfc) > -1
                }
            }),
            type: dataStatus[e]
        })
    }
    handleSelectStatus = e => {
        const dataStatus = [ALL, IN_STOCK, NOT_IN_STOCK, COMPLICATED]
        let { rfc, chassis } = this.props.builder
        rfc = rfc.replace(/\s/g, "")
        this.setState({
            filteredPayload: this.state.payload.filter(val => {
                if (dataStatus[e] !== ALL) {
                    return (
                        val["status"] === dataStatus[e] &&
                        val["standards"].indexOf(rfc) > -1
                    )
                } else {
                    return val["standards"].indexOf(rfc) > -1
                }
            }),
            status: dataStatus[e]
        })
    }
    handleOnExpand = (row, isExpand, rowIndex, e) => {
        if (isExpand) {
            this.setState(() => ({
                selectedRBS: row.name,
                expanded: [row.name]
            }))
        } else {
            this.setState(() => ({
                selectedRBS: "",
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
        rbsRef.on("value", snapshot => {
            this.setState(() => ({
                ...this.state,
                payload: snapshot.val(),
                filteredPayload: snapshot.val().filter(val => {
                    return val["standards"].indexOf(rfc) > -1
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
            selectedRBS,
            type,
            typedRBS
        } = this.state
        const { rfc, chassis, promoter } = this.props.builder
        if (!rfc || !chassis) return <Redirect to="/bbbuilder" />
        if (!promoter) return <Redirect to="/bbbuilder/promotere" />
        const expandRow = {
            renderer: row => (
                <div>
                    <p>Sample status: {`${row["status"]}`}</p>
                    <p>Compatible RFC standards: {`${row["standards"]}`}</p>
                    <p>
                        <strong> Experience: </strong>
                        {isNaN(row["experience"])
                            ? `${row["experience"]}`
                            : `${row["experience"]} Star!!`}
                    </p>
                    <p>Strength: {`${row["strength"]}`}</p>
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
                            Go back to Promoter selection
                        </Button>
                        <Button variant="warning" onClick={this.toggleLibrary}>
                            {fromLibrary && "Insert your own sequence"}
                            {!fromLibrary && "Select from the library"}
                        </Button>
                        <Button
                            variant="success"
                            onClick={this.handleClickContinue}
                            disabled={selectedRBS === ""}>
                            Select RBS
                        </Button>
                    </Col>
                </Row>
                <Row className="justify-content-center align-items-center mb-3">
                    <Col xs="12" md="3" className="mb-3">
                        <h1>RBS</h1>
                    </Col>
                    <Col xs="12" md="3">
                        <h5>
                            <strong>Chassis: </strong> {chassis}
                        </h5>
                    </Col>
                    <Col xs="12" md="3">
                        <h5>
                            <strong>RFC: </strong>
                            {rfc}
                        </h5>
                    </Col>
                    <Col xs="12" md="3">
                        <h5>
                            <strong>Promoter: </strong>
                            {promoter}
                        </h5>
                    </Col>
                    {fromLibrary && (
                        <React.Fragment>
                            <Col xs="12" md="6">
                                <h5 className="mr-5 d-inline-block">
                                    <strong>Status: </strong>
                                    {status || "All"}
                                </h5>
                                <DropdownButton
                                    id="dropdown-status-promoter"
                                    title="Status"
                                    className="mr-5 d-inline-block">
                                    <Dropdown.Item
                                        eventKey="0"
                                        onSelect={this.handleSelectStatus}>
                                        All
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="1"
                                        onSelect={this.handleSelectStatus}>
                                        In stock
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="2"
                                        onSelect={this.handleSelectStatus}>
                                        Not in stock
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="3"
                                        onSelect={this.handleSelectStatus}>
                                        It's complicated
                                    </Dropdown.Item>
                                </DropdownButton>
                            </Col>
                            <Col xs="12" md="6">
                                <h5 className="mr-5 d-inline-block">
                                    <strong>Type: </strong>
                                    {type || "All"}
                                </h5>
                                <DropdownButton
                                    id="dropdown-status-promoter"
                                    title="Status"
                                    className="mr-5 d-inline-block">
                                    <Dropdown.Item
                                        eventKey="0"
                                        onSelect={this.handleSelectType}>
                                        All
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="1"
                                        onSelect={this.handleSelectType}>
                                        Prokaryotic
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="2"
                                        onSelect={this.handleSelectType}>
                                        Eukaryotic
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
                            <h2>Insert your own sequence </h2>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-sequence">
                                        Sequence
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    value={typedRBS}
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
