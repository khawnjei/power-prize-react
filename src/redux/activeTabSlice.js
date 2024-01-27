const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  value: "",
};

export const activeTabSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    activeTab: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { activeTab } = activeTabSlice.actions;

export default activeTabSlice.reducer;
