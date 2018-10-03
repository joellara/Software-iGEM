import React, { Component } from "react"
import { connect } from "react-redux"
import { partsActions } from "../../actions"
import Container from "react-bootstrap/lib/Container"
import Row from "react-bootstrap/lib/Row"
import Col from "react-bootstrap/lib/Col"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import filterFactory, { textFilter } from "react-bootstrap-table2-filter"
import "../../css/table.css"

class Promoter extends Component {
    constructor(props) {
        super(props)
        const { dispatch } = this.props
        dispatch(partsActions.fetchPromoters())
        this.state = {
            columns: [
                {
                    dataField: "name",
                    text: "Product Name",
                    filter: textFilter(),
                    style: () => ({
                        width: "30%"
                    })
                },
                {
                    dataField: "desc",
                    text: "Product Description",
                    filter: textFilter()
                }
            ],
            selectRow: {
                mode: "radio",
                clickToSelect: true,
                hideSelectColumn: true,
                bgColor: "#7dc9ff"
            }
        }
    }
    render() {
        const { columns, selectRow } = this.state
        const { payload } = this.props
        return (
            <Container>
                <Row>
                    <Col sm="12" className="mb-3">
                        <h1>Promoter</h1>
                    </Col>
                    <Col sm="12">
                        {payload && (
                            <BootstrapTable
                                keyField="name"
                                columns={columns}
                                data={payload}
                                pagination={paginationFactory({
                                    showTotal: true,
                                    paginationTotalRenderer: (
                                        from,
                                        to,
                                        size
                                    ) => (
                                        <span className="react-bootstrap-table-pagination-total">
                                            Showing {from} to {to} of {size}{" "}
                                            Results
                                        </span>
                                    )
                                })}
                                selectRow={selectRow}
                                filter={filterFactory()}
                                bootstrap4={true}
                            />
                        )}
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProp = ({
    parts: {
        promoters: { payload }
    }
}) => {
    return { payload }
}
export default connect(mapStateToProp)(Promoter)
