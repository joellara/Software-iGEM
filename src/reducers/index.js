import { combineReducers } from "redux"
import { promoters } from "./partsReducer"
const partsReducer = combineReducers({ promoters })
const rootReducer = combineReducers({ parts: partsReducer })

export default rootReducer
