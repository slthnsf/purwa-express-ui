import axios from 'axios';
import { URL_API } from '../helper';

export const authLogin = (email, password) => {
    return async (dispatch) => {
        try {
            let res = await axios.post(URL_API + `/users/login`, {
                email, password
            })
            console.log("CEK authlogin:", res.data)
            localStorage.setItem('tkn_id', res.data.token)
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { ...res.data }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const authLogout = () => {
    localStorage.removeItem("tkn_id")
    return {
        type: "LOGOUT"
    }
}

export const keepLogin = (data) => {
    return async (dispatch) => {
        try {
            localStorage.setItem("tkn_id", data.token)
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: { ...data }
            })
        } catch (error) {
            console.log(error)
        }
    }
}