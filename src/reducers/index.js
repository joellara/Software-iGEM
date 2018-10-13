import { combineReducers } from "redux"
import { builder } from "./builder"
import { auth } from "./login"
const rootReducer = combineReducers({ builder, auth })

export default rootReducer
