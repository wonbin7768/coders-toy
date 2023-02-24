import { combineReducers } from "redux";
import stateReducer from "./statusSlice";
import timelineReducer from "./timelineSlice";

const rootReducer = combineReducers({
  stateReducer,
  timelineReducer,
});

export default rootReducer;
