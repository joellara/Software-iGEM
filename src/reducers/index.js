import { combineReducers } from "redux"
import { builder } from "./builder"
import { auth } from "./auth"
import { project } from "./project"
const rootReducer = combineReducers({ builder, auth, project })

export default rootReducer
