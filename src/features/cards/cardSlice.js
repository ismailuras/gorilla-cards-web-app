import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axiosConfig";

export const createCards = createAsyncThunk(
  "cards/createCards",
  async (note) => {
    const result = await axios.post("/cards", note);
    return result.data.data;
  }
);

export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async ({ deckId }) => {
    const result = await axios.get(`/decks/${deckId}/cards?limit=100&offset=0`);
    return result.data.data;
  }
);

export const updateCards = createAsyncThunk(
  "cards/updateCards",
  async ({ id, data }) => {
    const result = await axios.put(`/cards/${id}`, data);
    return result.data.data;
  }
);

export const deleteCard = createAsyncThunk("cards/deleteCard", async (id) => {
  const result = await axios.delete(`/cards/${id}`);
  return result.data;
});

export const getSingleCard = createAsyncThunk(
  "cards/getSingleCard",
  async ({ cardId }) => {
    const result = await axios.get(`/cards/${cardId}`);
    return result.data;
  }
);

const initialState = {
  cards: [],
  currentCard: null,
  createStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  fetchCardsStatus: "idle",
  getSingleCardStatus: "loading",
  errorMessagesOnFetch: [],
  errorMessagesOnCreateCards: [],
  errorMessagesOnDelete: [],
  errorMessagesOnUpdate: [],
  errorMessagesGetSingleCard: [],
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCards.fulfilled, (state, action) => {
      state.cards = [...state.cards, action.payload];
      state.createStatus = "idle";
    });
    builder.addCase(createCards.rejected, (state) => {
      state.errorMessagesOnCreateCards = ["unexpected-error"];
      state.createStatus = "idle";
    });
    builder.addCase(createCards.pending, (state) => {
      state.createStatus = "loading";
      state.errorMessagesOnCreateCards = [];
    });
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      state.cards = [...action.payload];
      state.fetchCardsStatus = "idle";
    });
    builder.addCase(fetchCards.rejected, (state) => {
      state.errorMessagesOnFetch = ["unexpected-error"];
      state.fetchCardsStatus = "idle";
    });
    builder.addCase(fetchCards.pending, (state) => {
      state.fetchCardsStatus = "loading";
      state.errorMessagesOnFetch = [];
    });
    builder.addCase(getSingleCard.fulfilled, (state, action) => {
      state.currentCard = action.payload;
      state.getSingleCardStatus = "idle";
    });
    builder.addCase(getSingleCard.rejected, (state) => {
      state.errorMessagesGetSingleCard = ["unexpected-error"];
      state.getSingleCardStatus = "idle";
    });
    builder.addCase(getSingleCard.pending, (state) => {
      state.getSingleCardStatus = "loading";
      state.errorMessagesGetSingleCard = [];
    });
    builder.addCase(updateCards.fulfilled, (state, action) => {
      const index = state.cards.findIndex(
        (card) => card.id === action.payload.id
      );
      state.currentCard = action.payload;
      state.cards[index] = action.payload;
      state.updateStatus = "idle";
    });
    builder.addCase(updateCards.rejected, (state) => {
      state.errorMessagesOnUpdate = ["unexpected error"];
      state.updateStatus = "idle";
    });
    builder.addCase(updateCards.pending, (state) => {
      state.updateStatus = "loading";
      state.errorMessagesOnUpdate = [];
    });
    builder.addCase(deleteCard.fulfilled, (state) => {
      state.cards = state.cards.filter(
        (card) => card.id !== state.currentCard.id
      );
      state.deleteStatus = "idle";
    });
    builder.addCase(deleteCard.rejected, (state, action) => {
      state.errorMessagesOnDelete = action.payload;
      state.deleteStatus = "idle";
    });
    builder.addCase(deleteCard.pending, (state) => {
      state.deleteStatus = "loading";
      state.errorMessagesOnDelete = [];
    });
  },
});

export const { setCurrentCard } = cardSlice.actions;

export default cardSlice.reducer;
