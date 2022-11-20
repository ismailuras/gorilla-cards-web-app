import { configureStore } from "@reduxjs/toolkit";
import deckSlice from "../features/decks/deckSlice";
import cardSlice from "../features/cards/cardSlice";
import authSlice from "features/auth-user/authSlice";

export const store = configureStore({
  reducer: {
    decks: deckSlice,
    cards: cardSlice,
    auth: authSlice,
  },
});

export default store;
