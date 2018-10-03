import { builderConstants } from "../constants"
const initialState = {
    rfc: "",
    promoter: "",
    terminator: "",
    chasis: "",
    rbs: ""
}

export const builder = (state = initialState, action) => {
    switch (action.type) {
        case builderConstants.SELECT_RFC:
            return {
                ...state,
                rfc: action.rfc
            }

        default:
            return state
    }
}
