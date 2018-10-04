import { builderConstants } from "../constants"
const initialState = {
    rfc: "",
    promoter: "",
    terminator: "",
    chassis: "",
    rbs: ""
}

export const builder = (state = initialState, action) => {
    switch (action.type) {
        case builderConstants.SELECT_RFC:
            return {
                ...state,
                rfc: action.rfc
            }
        case builderConstants.SELECT_CHASSIS:
            return {
                ...state,
                chassis: action.chassis
            }
        default:
            return state
    }
}
