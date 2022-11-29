import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axiosConfig";

export const updateDeckById = createAsyncThunk(
  "decks/updateByIdStatus",
  async ({ data, id }) => {
    await axios.put(`/decks/${id}`, data);
    return { id, ...data };
  }
);

export const createDeck = createAsyncThunk(
  "decks/createDeck",
  async ({ data }) => {
    const result = await axios.post("/decks", data);
    return result.data.data;
  }
);

export const deleteDeck = createAsyncThunk("decks/deleteDeck", async (id) => {
  const result = await axios.delete(`/decks/${id}`);
  return result.data;
});

export const fetchDecks = createAsyncThunk("decks/fetchDecks", async () => {
  const result = await axios.get("/decks");
  return result.data;
});

const initialState = {
  decks: [],
  currentDeck: [],
  fetchDeckStatus: "idle",
  createStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  errorMessagesOnFetch: [],
  errorMessagesOnCreate: [],
  errorMessagesOnUpdate: [],
  errorMessagesOnDelete: [],
};

const deckSlice = createSlice({
  name: "decks",
  initialState,
  reducers: {
    setCurrentDeck: (state, action) => {
      state.currentDeck = state.decks.find(
        (deck) => deck.id === action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDecks.fulfilled, (state, action) => {
      state.decks = action.payload;
      state.fetchDeckStatus = "idle";
    });
    builder.addCase(fetchDecks.rejected, (state) => {
      state.errorMessagesOnFetch = ["unexpected-error"];
      state.fetchDeckStatus = "idle";
    });
    builder.addCase(fetchDecks.pending, (state) => {
      state.fetchDeckStatus = "loading";
      state.errorMessagesOnFetch = [];
    });
    builder.addCase(createDeck.fulfilled, (state, action) => {
      state.createStatus = "idle";
      state.decks = [...state.decks, action.payload];
    });
    builder.addCase(createDeck.rejected, (state, action) => {
      state.errorMessagesOnCreate = ["unexpected-error"];
      state.createStatus = "idle";
    });
    builder.addCase(createDeck.pending, (state) => {
      state.createStatus = "loading";
      state.errorMessagesOnCreate = [];
    });
    builder.addCase(deleteDeck.fulfilled, (state) => {
      state.decks = state.decks.filter(
        (deck) => deck.id !== state.currentDeck.id
      );
      state.deleteStatus = "idle";
    });
    builder.addCase(deleteDeck.rejected, (state) => {
      state.errorMessagesOnDelete = ["unexpected-error"];
      state.deleteStatus = "idle";
    });
    builder.addCase(deleteDeck.pending, (state) => {
      state.deleteStatus = "loading";
      state.errorMessagesOnDelete = [];
    });
    builder.addCase(updateDeckById.fulfilled, (state, action) => {
      const index = state.decks.findIndex(
        (deck) => deck.id === action.payload.id
      );
      state.decks[index] = action.payload;
      state.updateStatus = "idle";
    });
    builder.addCase(updateDeckById.rejected, (state) => {
      state.errorMessagesOnUpdate = ["unexpected-error"];
      state.updateStatus = "idle";
    });
    builder.addCase(updateDeckById.pending, (state) => {
      state.updateStatus = "loading";
      state.errorMessagesOnUpdate = [];
    });
  },
});

export const { setCurrentDeck } = deckSlice.actions;

export default deckSlice.reducer;
