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
  async ({ id }) => {
    const result = await axios.get("/cards", id);
    return result.data;
  }
);

export const updateCards = createAsyncThunk("cards/updateCards", async (id) => {
  const result = await axios.put(`/cards/${id}`);
  return result;
});

export const deleteCard = createAsyncThunk("cards/deleteCard", async (id) => {
  const result = await axios.delete(`/cards/${id}`);
  return result.data;
});

const initialState = {
  cards: [],
  status: "loading",
  currentCard: [],
  createStatus: [],
  updateStatus: [],
  deleteStatus: [],
  errorMessagesOnFetch: [],
  errorMessagesOnCreateCards: [],
  errorMessagesOnDelete: [],
  errorMessagesOnUpdate: [],
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setCurrentCard: (state, action) => {
      state.currentCard = state.cards.find(
        (card) => card.id === action.payload.id
      );
    },
  },
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
      state.status = "idle";
    });
    builder.addCase(fetchCards.rejected, (state) => {
      state.errorMessagesOnFetch = ["unexpected-error"];
    });
    builder.addCase(fetchCards.pending, (state) => {
      state.status = "loading";
      state.errorMessagesOnFetch = [];
    });
    builder.addCase(updateCards.fulfilled, (state, action) => {
      const index = state.cards.findIndex(
        (card) => card.id === action.payload.id
      );
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
