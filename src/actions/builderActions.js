import { builderConstants } from "../constants"

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

export const builderActions = {
    selectRFC,
    selectChassis,
    selectPromoter,
    selectRBS,
    selectSequence,
    selectTerminator
}
