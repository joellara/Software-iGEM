import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { promotersRef } from "../../config/firebase"
import { builderActions } from "../../actions"

//Components
import ColorCodes from "../../components/BBBuilder/ColorCodes"
import InfoBar from "../../components/BBBuilder/InfoBar"
import SampleStockStatus from "../../components/BBBuilder/SampleStockStatus"
import InputSequence from "../../components/BBBuilder/InputSequence"

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
import Button from "react-bootstrap/lib/Button"

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
            typedPromoter: "",
            selectedPromoter: "",
            expanded: [],
            inLibrary: true
        }
        this.handleSelectStatus = this.handleSelectStatus.bind(this)
        this.handClickBack = this.handClickBack.bind(this)
        this.handleClickContinue = this.handleClickContinue.bind(this)
        this.toggleLibrary = this.toggleLibrary.bind(this)
        this.handleTypeSequence = this.handleTypeSequence.bind(this)
    }
    handleTypeSequence = event => {
        this.setState({ typedPromoter: event.target.value })
    }
    handClickBack = () => {
        const { history } = this.props
        history.push("/bbbuilder")
    }
    getSequence = row => {
        builderActions
            .getSequence(row.name)
            .then(response => {
                this.setState({
                    filteredPayload: this.state.filteredPayload.map(val => {
                        if (val["name"] === row.name) {
                            val["sequence"] = response.data[
                                Object.keys(response.data)[0]
                            ].sequence.replace(/\s/g, "")
                        }
                        return val
                    })
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    toggleLibrary = () => {
        const { inLibrary } = this.state
        if (inLibrary) {
            this.setState({
                inLibrary: !inLibrary,
                typedPromoter: "",
                selectedPromoter: "",
                expanded: []
            })
        } else {
            this.setState({
                inLibrary: !inLibrary,
                typedPromoter: "",
                selectedPromoter: "",
                expanded: []
            })
        }
    }
    handleClickContinue = () => {
        const { selectedPromoter, typedPromoter } = this.state
        const { dispatch } = this.props
        dispatch(
            builderActions.selectPromoter(selectedPromoter || typedPromoter)
        )
        const { history } = this.props
        history.push("/bbbuilder/rbs")
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
                    return val["standards"].indexOf(rfc) > -1
                })
            }))
        })
    }
    render() {
        const {
            filteredPayload,
            status,
            typedPromoter,
            expanded,
            inLibrary,
            selectedPromoter
        } = this.state
        const { rfc, chassis } = this.props.builder
        if (!rfc || !chassis) return <Redirect to="/bbbuilder" />
        const columns = [
            {
                dataField: "name",
                text: "Product Name",
                filter: textFilter(),
                sort: true,
                style: (cell, row, rowIndex, colIndex) => ({
                    width: "15%"
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
                    width: "15%"
                })
            },
            {
                dataField: "uses",
                text: "Usos",
                sort: true,
                style: (cell, row, rowIndex, colIndex) => ({
                    width: "15%"
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
                            Link to iGEM
                        </Button>
                    )
                },
                style: (cell, row, rowIndex, colIndex) => ({
                    width: "10%"
                })
            }
        ]
        const expandRow = {
            renderer: row => (
                <div className="wrapper">
                    <div className="content">
                        <p>
                            <strong>Sample status: </strong>{" "}
                            {`${row["status"]}`}
                        </p>
                        <p>
                            <strong>Length: </strong> {`${row["length"]}`}
                        </p>
                        <p>
                            <strong>Compatible RFC standards: </strong>{" "}
                            {`${row["standards"]}`}
                        </p>
                        <p>
                            <strong>Sigma factor: </strong>{" "}
                            {`${row["sigma_factor"]}`}
                        </p>
                        <p>
                            <strong> Experience: </strong>
                            {isNaN(row["experience"])
                                ? `${row["experience"]}`
                                : `${row["experience"]} Star!!`}
                        </p>
                        {row["sequence"] && (
                            <p className="sequence">
                                <strong>Sequence: </strong>{" "}
                                {`${row["sequence"]}`}
                            </p>
                        )}
                        {!row["sequence"] && (
                            <Button onClick={() => this.getSequence(row)}>
                                Get Sequence
                            </Button>
                        )}
                    </div>
                    <div className="sidebar">
                        <Button
                            variant="success"
                            onClick={this.handleClickContinue}
                            disabled={
                                selectedPromoter === "" && typedPromoter === ""
                            }>
                            Select promoter
                        </Button>
                    </div>
                </div>
            ),
            expanded: expanded,
            onExpand: this.handleOnExpand
        }
        return (
            <Container className="mb-5">
                <InfoBar
                    statusPosition={"Promoter"}
                    chassis={chassis}
                    rfc={rfc}
                />
                <Row className="my-3">
                    <Col className="d-flex justify-content-between">
                        <Button onClick={this.handClickBack}>
                            Go back to Chassis & RFC selection
                        </Button>
                        <Button variant="warning" onClick={this.toggleLibrary}>
                            {inLibrary && "Insert your own sequence"}
                            {!inLibrary && "Select from the library"}
                        </Button>
                    </Col>
                </Row>
                {inLibrary && (
                    <React.Fragment>
                        <Row>
                            <ColorCodes />
                            <SampleStockStatus
                                val={status}
                                handler={this.handleSelectStatus}
                            />
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
                                        filter={filterFactory()}
                                        bootstrap4={true}
                                        rowStyle={this.rowStyle}
                                        expandRow={expandRow}
                                        selectRow={selectRow}
                                    />
                                )}
                            </Col>
                        </Row>
                    </React.Fragment>
                )}
                {!inLibrary && (
                    <InputSequence
                        val={typedPromoter}
                        handler={this.handleTypeSequence}
                    />
                )}
            </Container>
        )
    }
}

const mapStateToProps = ({ builder }) => ({
    builder
})
export default connect(mapStateToProps)(Promoter)