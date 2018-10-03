import React, { Component } from "react"
import { connect } from "react-redux"
import { partsActions } from "../../actions"
import { promotersRef } from "../../config/firebase"
import Container from "react-bootstrap/lib/Container"
import Row from "react-bootstrap/lib/Row"
import Col from "react-bootstrap/lib/Col"
import Button from "react-bootstrap/lib/Button"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import filterFactory, { textFilter } from "react-bootstrap-table2-filter"
import "../../css/table.css"

class Promoter extends Component {
    constructor(props) {
        super(props)
        promotersRef.on("value", snapshot => {
            this.setState({
                ...this.state,
                payload: snapshot.val()
            })
        })
        this.state = {
            columns: [
                {
                    dataField: "name",
                    text: "Product Name",
                    filter: textFilter(),
                    style: () => ({
                        width: "30%"
                    }),
                    sort: true
                },
                {
                    dataField: "desc",
                    text: "Product Description",
                    filter: textFilter(),
                    sort: true
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
        const { columns, selectRow, payload } = this.state
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

// const mapStateToProp = ({}) => {
//     return {}
// }
export default connect()(Promoter)
