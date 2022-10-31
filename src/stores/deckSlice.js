import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "firebaseConfig";

const initialState = {
  id: null,
  items: [],
  status: "loading",
  createStatus: "idle",
  errorMessage: null,
  errorMessageOnCreate: null,
};

const createDeckSlice = createSlice({
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
    createDeckStarted: (state, action) => {
      state.createStatus = "loading";
      state.id = action.payload;
    },
    createDeckCompleted: (state, action) => {
      state.createStatus = "idle";
      state.items = [...state.items, action.payload];
    },
  },
});

export const {
  fetchStarted,
  fetchCompleted,
  createDeckStarted,
  createDeckCompleted,
} = createDeckSlice.actions;

export const fetchDecks = () => async (dispatch) => {
  dispatch(fetchStarted());
  const snapshot = await getDocs(collection(db, "decks"));
  const res = snapshot.docs.map((doc) => doc.data());
  dispatch(fetchCompleted(res));
};

export const createDeck = (data) => async (dispatch) => {
  dispatch(createDeckStarted());
  await addDoc(collection(db, "decks"), data);
  dispatch(createDeckCompleted(data));
};

export default createDeckSlice.reducer;
