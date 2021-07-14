import { combineReducers } from "redux";
import { usersReducer } from "./userReducer";
import { packetReducers } from "./packetReducer";
import { adminReducers } from "./adminReducer";
import { courierReducers } from "./courierReducer";

export const Reducers = combineReducers({
  usersReducer,
  packetReducers,
  adminReducers,
  courierReducers,
});
