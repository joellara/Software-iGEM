import { builderConstants } from "../constants"
const initialState = {
    rfc: "",
    promoter: "",
    terminator: "",
    chassis: "",
    rbs: "",
    sequence: ""
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
        case builderConstants.SELECT_PROMOTER:
            return {
                ...state,
                promoter: action.promoter
            }
        case builderConstants.SELECT_RBS:
            return {
                ...state,
                rbs: action.rbs
            }
        case builderConstants.SELECT_SEQUENCE:
            return {
                ...state,
                sequence: action.sequence
            }
        case builderConstants.SELECT_TERMINATOR:
            return {
                ...state,
                terminator: action.terminator
            }
        default:
            return state
    }
}
