import { configureStore } from "@reduxjs/toolkit";
import decksReducer from "./deckSlice";

export const store = configureStore({
  reducer: {
    decks: decksReducer,
  },
});

export default store;
