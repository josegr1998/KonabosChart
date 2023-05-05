import { configureStore } from "@reduxjs/toolkit";
import authorsSlice from "./features/authorsSlice";

export const store = configureStore({
  reducer: {
    authorsSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
