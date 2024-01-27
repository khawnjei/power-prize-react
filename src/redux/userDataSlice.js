const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  userData: null,
  token: "",
  refreshToken: "",
  productItem: null,
};

export const userDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userData: (state, action) => {
      state.userData = action.payload;
    },
    accessToken: (state, action) => {
      state.token = action.payload;
    },
    refreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    productItem: (state, action) => {
      state.productItem = action.payload;
    },
  },
});

export const { userData, accessToken, refreshToken, productItem } =
  userDataSlice.actions;

export default userDataSlice.reducer;
