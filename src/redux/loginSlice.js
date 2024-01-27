const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  login: false,
  
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginState: (state, action) => {
      state.login = action.payload;
    },
  },
});

export const { loginState } = loginSlice.actions;

export default loginSlice.reducer;
