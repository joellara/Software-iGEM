
const login = TOKEN => ({
    type: "LOGIN",
    token: TOKEN
})


const setPUID = PUID => ({
    type: "SETPROYECTUID",
    PUID: PUID
})

export const loginActions = {
    login,
    setPUID
}