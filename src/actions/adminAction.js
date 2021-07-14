import axios from "axios";
import { URL_API } from "../helper";

export const getData = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get(URL_API + `/admin/get-input`);
      dispatch({
        type: "GET_DATA",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getKota = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get(URL_API + `/ongkir/getCity`);
      dispatch({
        type: "GET_KOTA",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getRoleUsers = () => {
  return async (dispatch) => {
    try {
      let res = await axios.get(URL_API + `/users/usersRole`);
      dispatch({
        type: "GET_ROLE_USERS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
