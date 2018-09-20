import { TEST } from "../actions/index";

export default function(state = null, action) {
  switch (action.type) {
    case TEST:
      return action.payload;
    default:
      return state;
  }
}
