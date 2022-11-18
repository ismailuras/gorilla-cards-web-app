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
    console.log(result, "deck result");
    return result.data.data;
  }
);

export const deleteDeck = createAsyncThunk("decks/deleteDeck", async (id) => {
  const result = await axios.delete(`/decks/${id}`);
  console.log("delete resul", result);
  return result.data;
});

export const fetchDecks = createAsyncThunk("decks/fetchDecks", async () => {
  const result = await axios.get("/decks");
  return result.data;
});

const initialState = {
  decks: [],
  currentDeck: null,
  status: "loading",
  createStatus: "idle",
  updateStatus: null,
  deleteStatus: null,
  errorMessage: null,
  errorMessageOnCreate: null,
  updateErrorMessage: null,
  deleteErrorMessage: null,
};

const deckSlice = createSlice({
  name: "decks",
  initialState,
  reducers: {
    setCurrentDeck: (state, action) => {
      state.currentDeck = state.decks.find(
        (item) => item.id === action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDecks.fulfilled, (state, action) => {
      state.decks = action.payload;
      state.status = "idle";
    });
    builder.addCase(fetchDecks.rejected, (state) => {
      state.errorMessage = true;
    });
    builder.addCase(fetchDecks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createDeck.fulfilled, (state, action) => {
      state.createStatus = "idle";
      state.decks = [...state.decks, action.payload];
    });
    builder.addCase(createDeck.rejected, (state) => {
      state.errorMessageOnCreate = true;
      state.status = "idle";
    });
    builder.addCase(createDeck.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteDeck.fulfilled, (state) => {
      state.decks = state.decks.filter(
        (item) => item.id !== state.currentDeck.id
      );
      state.deleteStatus = "idle";
    });
    builder.addCase(deleteDeck.rejected, (state) => {
      state.deleteErrorMessage = true;
      state.deleteStatus = "idle";
    });
    builder.addCase(deleteDeck.pending, (state) => {
      state.deleteStatus = "loading";
    });
    builder.addCase(updateDeckById.fulfilled, (state, action) => {
      const index = state.decks.findIndex(
        (item) => item.id === action.payload.id
      );
      state.decks[index] = action.payload;
      state.updateStatus = "idle";
    });
    builder.addCase(updateDeckById.rejected, (state) => {
      state.updateErrorMessage = true;
      state.updateStatus = "idle";
    });
    builder.addCase(updateDeckById.pending, (state) => {
      state.updateStatus = "loading";
    });
  },
});

export const {
  errorMessageOnCreateDeck,
  errorMessageOnFetchDeck,
  setCurrentDeck,
} = deckSlice.actions;

export default deckSlice.reducer;
