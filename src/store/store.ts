import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
});

// ✅ TypeScript helper types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
