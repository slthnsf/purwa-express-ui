const INITIAL_STATE = {
  iduser: null,
  username: "",
  email: "",
  role: ""
};

export const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      delete action.payload.password;
      console.log("Data user reducer", action.payload)
      return { ...state, ...action.payload };
    case "LOGOUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};
