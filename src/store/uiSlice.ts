import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { activeTab: "newPairs", sortOrder: "asc" },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

export const { setActiveTab, setSortOrder } = uiSlice.actions;
export default uiSlice.reducer;
