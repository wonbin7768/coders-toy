import { combineReducers } from "redux";
import stateReducer from "./statusSlice";
import commentReducer from "./commentSlice";

const rootReducer = combineReducers({
  stateReducer,
  commentReducer,
});

export default rootReducer;
