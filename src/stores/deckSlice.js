import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "firebaseConfig";

export const updateDeckById = createAsyncThunk(
  "decks/updateByIdStatus",
  async ({ data, id }) => {
    const deckRef = doc(db, "decks", id);
    await updateDoc(deckRef, data);
    return { ...data, id };
  }
);

export const createDeck = createAsyncThunk(
  "decks/createDeck",
  async ({ data }) => {
    const user = auth.currentUser;
    const requestData = { ...data, author: user.uid };
    const result = await addDoc(collection(db, "decks"), requestData);
    const { id } = result;
    const newData = { ...data, id, author: user.uid };
    return { data, ...newData };
  }
);

export const deleteDeck = createAsyncThunk("decks/deleteDeck", async (id) => {
  const deckRef = doc(db, "decks", id);
  await deleteDoc(deckRef);
  return id;
});

export const fetchDecks = createAsyncThunk("decks/fetchDecks", async () => {
  const user = auth.currentUser;
  const q = query(collection(db, "decks"), where("author", "==", user.uid));
  const snapshot = await getDocs(q);
  const res = snapshot.docs.map((doc) => ({
    id: doc.id,
    author: user.uid,
    ...doc.data(),
  }));
  return res;
});

const initialState = {
  items: [],
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
      state.currentDeck = state.items.find(
        (item) => item.id === action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDecks.fulfilled, (state, action) => {
      state.items = action.payload;
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
      state.items = [...state.items, action.payload];
    });
    builder.addCase(createDeck.rejected, (state) => {
      state.errorMessageOnCreate = true;
      state.status = "idle";
    });
    builder.addCase(createDeck.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteDeck.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
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
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items[index] = action.payload;
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
