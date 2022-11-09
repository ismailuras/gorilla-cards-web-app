import { configureStore } from "@reduxjs/toolkit";
import deckSlice from "./deckSlice";
import cardSlice from "./cardSlice";

export const store = configureStore({
  reducer: {
    decks: deckSlice,
    cards: cardSlice,
  },
});

export default store;
