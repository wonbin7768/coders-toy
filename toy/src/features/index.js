import { combineReducers } from "redux";
import stateReducer from "./statusSlice";
import modalReducer from "./modalSlice";
const rootReducer = combineReducers({
  stateReducer,
  modalReducer,
});

export default rootReducer;
