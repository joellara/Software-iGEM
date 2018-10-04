import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { promotersRef } from "../../config/firebase"
import Container from "react-bootstrap/lib/Container"
import Row from "react-bootstrap/lib/Row"
import Col from "react-bootstrap/lib/Col"
import DropdownButton from "react-bootstrap/lib/DropdownButton"
import Dropdown from "react-bootstrap/lib/Dropdown"
import Button from "react-bootstrap/lib/Button"

//Table
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import filterFactory, {
    textFilter,
    selectFilter
} from "react-bootstrap-table2-filter"

//Style
import "../../css/table.css"
const selectOptions = {
    Inducible: "Inducible",
    Constitutive: "Constitutive",
    Repressible: "Repressible",
    Multiple: "Multiple"
}
const IN_STOCK = "In stock"
const NOT_IN_STOCK = "Not in stock"
const COMPLICATED = "It's complicated"
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
const rowStyle = (row, rowIndex) => {
    const style = {}
    if (row["status"] === IN_STOCK) {
        style.border = "2px solid #9eca8d"
    } else if (row["status"] === NOT_IN_STOCK) {
        style.border = "2px solid #f38484"
    } else if (row["status"] === COMPLICATED) {
        style.border = "2px solid rgb(255, 217, 30)"
    }
    return style
}
const expandRow = {
    renderer: row => (
        <div>
            <p>Sample status: {`${row["status"]}`}</p>
            <p>Length: {`${row["length"]}`}</p>
        </div>
    )
}
class Promoter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "",
            payload: [],
            filteredPayload: []
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick = e => {
        const dataRfc = [IN_STOCK, NOT_IN_STOCK, COMPLICATED]
        let { rfc, chassis } = this.props.builder
        rfc = rfc.replace(/\s/g, "")
        this.setState({
            filteredPayload: this.state.payload.filter(val => {
                return (
                    val["status"] === dataRfc[e] &&
                    val["standards"].indexOf(rfc) > -1 &&
                    val["chassis"] === chassis
                )
            }),
            status: dataRfc[e]
        })
    }
    componentDidMount() {
        let { rfc, chassis } = this.props.builder
        rfc = rfc.replace(/\s/g, "")
        promotersRef.on("value", snapshot => {
            this.setState({
                ...this.state,
                payload: snapshot.val(),
                filteredPayload: snapshot.val().filter(val => {
                    return (
                        val["standards"].indexOf(rfc) > -1 &&
                        val["chassis"] === chassis
                    )
                })
            })
        })
    }
    render() {
        const { filteredPayload, status } = this.state
        const { rfc, chassis } = this.props.builder
        if (!rfc || !chassis) return <Redirect to="/bbbuilder" />
        return (
            <Container>
                <Row className="justify-content-center align-items-center">
                    <Col xs="12" md="3" className="mb-3">
                        <h1>Promoter</h1>
                    </Col>
                    <Col xs="12" md="3">
                        <h5>{chassis}</h5>
                    </Col>
                    <Col xs="12" md="3">
                        <h5>{rfc}</h5>
                    </Col>
                    <Col xs="12" md="1">
                        <h5 className="mr-5">{status || "All"}</h5>
                    </Col>
                    <Col xs="12" md="2">
                        <DropdownButton
                            id="dropdown-status-promoter"
                            title="Status">
                            <Dropdown.Item
                                eventKey="0"
                                onSelect={this.handleClick}>
                                In stock
                            </Dropdown.Item>
                            <Dropdown.Item
                                eventKey="1"
                                onSelect={this.handleClick}>
                                Not in stock
                            </Dropdown.Item>
                            <Dropdown.Item
                                eventKey="2"
                                onSelect={this.handleClick}>
                                It's complicated
                            </Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>
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
                                selectRow={selectRow}
                                filter={filterFactory()}
                                bootstrap4={true}
                                rowStyle={rowStyle}
                                expandRow={expandRow}
                            />
                        )}
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = ({ builder }) => ({
    builder
})
export default connect(mapStateToProps)(Promoter)
