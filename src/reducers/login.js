const initialState = {
    token: "",
    PUID: ""
}

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                token: action.token
            }
        case "SETPROYECTUID":
            return {
                ...state,
                PUID: action.PUID
            }
        default:
            return state
    }
}
