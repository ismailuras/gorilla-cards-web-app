import { configureStore } from "@reduxjs/toolkit";
import deckSlice from "../features/decks/deckSlice";
import cardSlice from "../features/cards/cardSlice";

export const store = configureStore({
  reducer: {
    decks: deckSlice,
    cards: cardSlice,
  },
});

export default store;
