import { builderConstants, RFC10 } from "../constants"
import axios from "axios"
const selectRFC = RFC => ({
    type: builderConstants.SELECT_RFC,
    rfc: RFC
})
const selectChassis = Chassis => ({
    type: builderConstants.SELECT_CHASSIS,
    chassis: Chassis
})
const selectPromoter = promoter => ({
    type: builderConstants.SELECT_PROMOTER,
    promoter: promoter
})
const selectRBS = rbs => ({
    type: builderConstants.SELECT_RBS,
    rbs: rbs
})
const selectSequence = sequence => ({
    type: builderConstants.SELECT_SEQUENCE,
    sequence: sequence
})
const selectTerminator = terminator => ({
    type: builderConstants.SELECT_TERMINATOR,
    terminator: terminator
})
const getSequence = bbName => {
    return axios.get(
        `https://igem-texem.firebaseio.com/parts/sequences.json?print=pretty&orderBy="name"&equalTo="${bbName}"`
    )
}
const createBioBrick = (rfc, ...rest) => {
    switch (rfc) {
        case RFC10.name:
            return createRFC10(...rest)
        default:
            break
    }
}
const createRFC10 = (promoter, rbs, sequence, terminator) => {
    console.log(promoter)
    console.log(rbs)
    console.log(sequence)
    console.log(terminator)
    console.log(RFC10)

    return (
        RFC10.prefix +
        promoter +
        RFC10.scar +
        rbs +
        RFC10.scar2 +
        sequence +
        RFC10.scar +
        terminator +
        RFC10.suffix
    )
}
export const builderActions = {
    selectRFC,
    selectChassis,
    selectPromoter,
    selectRBS,
    selectSequence,
    selectTerminator,
    getSequence,
    createBioBrick
}
