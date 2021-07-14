const INITIAL_STATE = {
  data: [],
  kota: [],
  role: [],
};

export const adminReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_DATA":
      return { ...state, data: action.payload };
    case "GET_KOTA":
      return { ...state, kota: action.payload };
    case "GET_ROLE_USERS":
      return { ...state, role: action.payload };
    default:
      return state;
  }
};
