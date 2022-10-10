import { combineReducers } from "redux";
import stateReducer from "./statusSlice";

const rootReducer = combineReducers({
  stateReducer,
});

export default rootReducer;
