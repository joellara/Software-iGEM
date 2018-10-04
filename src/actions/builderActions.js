import { builderConstants } from "../constants"

const selectRFC = RFC => ({
    type: builderConstants.SELECT_RFC,
    rfc: RFC
})
const selectChassis = Chassis => ({
    type: builderConstants.SELECT_CHASSIS,
    chassis: Chassis
})
export const builderActions = {
    selectRFC,
    selectChassis
}
