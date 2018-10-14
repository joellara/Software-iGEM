import { authConstants } from "../constants"
const initialState = {
    UID: ""
}

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case authConstants.LOGIN_SUCCESS:
            return {
                UID: action.UID
            }
        case authConstants.LOGOUT_SUCCESS:
            return {
                ...initialState
            }
        default:
            return state
    }
}
