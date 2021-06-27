import { combineReducers } from "redux";
import { usersReducer } from "./userReducer";
import { packetReducers } from "./packetReducer";

export const Reducers = combineReducers({
  usersReducer, packetReducers
});
