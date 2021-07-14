const INITIAL_STATE = {
  pengiriman: [],
  status: [],
};

export const courierReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_PENGIRIMAN":
      return { ...state, pengiriman: action.payload };
    case "GET_STATUS":
      return { ...state, status: action.payload };
    default:
      return state;
  }
};
