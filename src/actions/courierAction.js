import axios from "axios";
import { URL_API } from "../helper";

export const getPengiriman = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get("http://localhost:2000/courier/get-pengiriman");
      dispatch({
        type: "GET_PENGIRIMAN",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getStatus = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get("http://localhost:2000/courier/get-status");
      dispatch({
        type: "GET_STATUS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
