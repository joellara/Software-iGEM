import { partsConstants } from "../constants"
import { promotersRef } from "../config/firebase"

const fetchPromoters = () => {
    return dispatch => {
        return promotersRef.on("value", snapshot => {
            dispatch({
                type: partsConstants.FETCH_PROMOTERS,
                payload: snapshot.val()
            })
        })
    }
}
export const partsActions = {
    fetchPromoters
}
