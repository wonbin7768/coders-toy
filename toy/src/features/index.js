import { combineReducers } from "redux";
import stateReducer from "./statusSlice";
import commentReducer from "./commentSlice";

const rootReducer = combineReducers({
  stateReducer
});

export default rootReducer;
