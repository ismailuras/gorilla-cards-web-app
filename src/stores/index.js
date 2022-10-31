import { configureStore } from "@reduxjs/toolkit";
import decksReducer from "./createDeckSlice";

export const store = configureStore({
  reducer: {
    decks: decksReducer,
  },
});

export default store;
