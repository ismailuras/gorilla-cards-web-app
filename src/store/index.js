import { configureStore } from "@reduxjs/toolkit";
import deckSlice from "../features/decks/deckSlice";
import cardSlice from "../features/cards/cardSlice";
import seedSlice from "features/browse-card/seedSlice";
import authSlice from "features/auth-user/authSlice";
import createSeedSlice from "features/decks/create-seed/createSeedSlice";

export const store = configureStore({
  reducer: {
    decks: deckSlice,
    cards: cardSlice,
    auth: authSlice,
    seed: seedSlice,
    createSeed: createSeedSlice,
  },
});

export default store;
