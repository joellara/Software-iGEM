import { authConstants } from "../constants"
const login = UID => ({
    type: authConstants.LOGIN_SUCCESS,
    UID: UID
})
const logout = () => ({
    type: authConstants.LOGOUT_SUCCESS
})

export const authActions = {
    login,
    logout
}
