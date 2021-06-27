const INITIAL_STATE = {
    packet_list: []
}

export const packetReducers = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "GET_DATA_PACKET":
            console.log("data barang reducer:", action.payload)
            return {...state, packet_list: action.payload}
        default:
            return state
    }
}