import { builderConstants } from "../constants"

const selectRFC = RFC => ({
    type: builderConstants.SELECT_RFC,
    rfc: RFC
})

export const builderActions = {
    selectRFC
}
