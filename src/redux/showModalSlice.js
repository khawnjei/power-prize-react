const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  showModal: false,
};

export const showModal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModalValue: (state, action) => {
      state.showModal = action.payload;
      // console.log("modal", state);
    },
  },
});

export const { showModalValue } = showModal.actions;

export default showModal.reducer;
