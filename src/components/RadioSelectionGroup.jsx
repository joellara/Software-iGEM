import React from "react"
import FormGroup from "react-bootstrap/lib/FormGroup"
import FormCheck from "react-bootstrap/lib/FormCheck"

const list = ({ listData, stateData, _function, name }) => {
    return listData.map(data => {
        return (
            <FormGroup
                key={`radioGroup${data}`}
                id={`radioGroup${data.replace(/\s/g, "")}`}
                className={stateData === data ? "active" : ""}>
                <FormCheck
                    onClick={() => _function(`${data}`)}
                    type="radio"
                    name={name}
                    id={`${data.replace(/\s/g, "")}`}
                    label={data}
                />
            </FormGroup>
        )
    })
}
export default list
