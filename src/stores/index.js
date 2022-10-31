import { configureStore } from "@reduxjs/toolkit";
import deckSlice from "./deckSlice";

export const store = configureStore({
  reducer: {
    decks: deckSlice,
  },
});

export default store;
