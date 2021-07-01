import axios from "axios"
import { URL_API } from "../helper"


export const getDataPacketAction = () => {
    return async (dispatch) => {
        try {
            let res = await axios.get(URL_API + `/admin/get-all`)
            console.log("data barang actions:", res.data)
            dispatch({
                type: "GET_DATA_PACKET",
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}



