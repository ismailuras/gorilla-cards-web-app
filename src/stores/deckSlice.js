import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "firebaseConfig";

const initialState = {
  items: [],
  status: "loading",
  createStatus: "idle",
  errorMessage: null,
  errorMessageOnCreate: null,
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
    createDeckStarted: (state, action) => {
      state.createStatus = "loading";
      state.id = action.payload;
    },
    createDeckCompleted: (state, action) => {
      state.createStatus = "idle";
      state.items = [...state.items, action.payload];
    },
    errorMessageOnCreateDeck: (state) => {
      state.errorMessageOnCreate = "error";
    },
    errorMessageOnFetchDeck: (state) => {
      state.errorMessage = "error";
    },
  },
});

export const {
  fetchStarted,
  fetchCompleted,
  createDeckStarted,
  createDeckCompleted,
  errorMessageOnCreateDeck,
  errorMessageOnFetchDeck,
} = deckSlice.actions;

export const fetchDecks = () => async (dispatch) => {
  dispatch(fetchStarted());
  try {
    var user = auth.currentUser;
    const q = query(collection(db, "decks"), where("author", "==", user.uid));
    const snapshot = await getDocs(q);
    const res = snapshot.docs.map((doc) => doc.data());
    dispatch(fetchCompleted(res));
  } catch (error) {
    errorMessageOnFetchDeck();
  }
};

export const createDeck = (data) => async (dispatch) => {
  var user = auth.currentUser;
  data = { ...data, author: user.uid };
  try {
    dispatch(createDeckStarted());
    await addDoc(collection(db, "decks"), data);
  } catch (error) {
    dispatch(errorMessageOnCreateDeck());
  } finally {
    dispatch(createDeckCompleted(data));
  }
};

export default deckSlice.reducer;
