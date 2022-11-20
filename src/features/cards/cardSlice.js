import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axiosConfig";

export const createCards = createAsyncThunk(
  "cards/createCards",
  async (note) => {
    const result = await axios.post("/cards", note);
    return result.data;
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

const initialState = {
  cards: [],
  status: "loading",
  createStatus: [],
  updateStatus: [],
  deleteStatus: [],
  errorMessagesOnFetch: [],
  errorMessagesOnCreateCards: [],
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
      state.errorMessageOnCreateCards = true;
      state.createStatus = "idle";
    });
    builder.addCase(createCards.pending, (state) => {
      state.createStatus = "loading";
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
    });
    builder.addCase(updateCards.fulfilled, (state, action) => {
      const index = state.cards.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cards[index] = action.payload;
      state.updateStatus = "idle";
    });
    builder.addCase(updateCards.rejected, (state) => {
      state.errorMessage = true;
      state.updateStatus = "idle";
    });
    builder.addCase(updateCards.pending, (state) => {
      state.updateStatus = "loading";
    });
  },
});

export default cardSlice.reducer;
