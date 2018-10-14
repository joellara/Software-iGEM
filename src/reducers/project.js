import { projectConstants } from "../constants"
const initialState = {
    PUID: ""
}

export const project = (state = initialState, action) => {
    switch (action.type) {
        case projectConstants.SELECT_PROJECT:
            return {
                PUID: action.PUID
            }
        // case authConstants.LOGOUT_SUCCESS:
        //     return {
        //         ...initialState
        //     }
        default:
            return state
    }
}
