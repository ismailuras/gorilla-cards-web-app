import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
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

const initialState = {
  items: [],
  currentDeck: null,
  status: "loading",
  createStatus: "idle",
  updateStatus: null,
  errorMessage: null,
  errorMessageOnCreate: null,
  updateErrorMessage: null,
};

const deckSlice = createSlice({
  name: "decks",
  initialState,
  reducers: {
    fetchStarted: (state) => {
      state.status = "loading";
    },
    fetchCompleted: (state, action) => {
      state.items = action.payload;
      state.status = "idle";
    },
    setCurrentDeck: (state, action) => {
      state.currentDeck = state.items.find(
        (item) => item.id === action.payload.id
      );
    },
    createDeckStarted: (state) => {
      state.createStatus = "loading";
    },
    createDeckCompleted: (state, action) => {
      state.createStatus = "idle";
      state.items = [...state.items, action.payload];
    },
    errorMessageOnCreateDeck: (state) => {
      state.status = "idle";
      state.errorMessageOnCreate = "error";
    },
    errorMessageOnFetchDeck: (state) => {
      state.errorMessage = "error";
    },
  },
  extraReducers: (builder) => {
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
  fetchStarted,
  fetchCompleted,
  createDeckStarted,
  createDeckCompleted,
  errorMessageOnCreateDeck,
  errorMessageOnFetchDeck,
  setCurrentDeck,
} = deckSlice.actions;

export const fetchDecks = () => async (dispatch) => {
  dispatch(fetchStarted());
  try {
    var user = auth.currentUser;
    const q = query(collection(db, "decks"), where("author", "==", user.uid));
    const snapshot = await getDocs(q);
    const res = snapshot.docs.map((doc) => ({
      id: doc.id,
      author: user.uid,
      ...doc.data(),
    }));
    dispatch(fetchCompleted(res));
  } catch (error) {
    dispatch(errorMessageOnFetchDeck());
  }
};

export const createDeck = (data) => async (dispatch) => {
  const user = auth.currentUser;
  const requestData = { ...data, author: user.uid };
  try {
    dispatch(createDeckStarted());
    const result = await addDoc(collection(db, "decks"), requestData);
    const { id } = result;
    const newData = { ...data, id, author: user.uid };
    dispatch(createDeckCompleted(newData));
  } catch (error) {
    dispatch(errorMessageOnCreateDeck());
  }
};

export default deckSlice.reducer;
