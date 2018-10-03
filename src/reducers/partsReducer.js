import { partsConstants } from "../constants"
export function promoters(state = {}, action) {
    switch (action.type) {
        case partsConstants.FETCH_PROMOTERS:
            return {
                payload: action.payload
            }
        default:
            return state
    }
}
