import { createSlice } from "@reduxjs/toolkit";
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

const initialState = {
  items: [],
  currentDeck: null,
  status: "loading",
  createStatus: "idle",
  errorMessage: null,
  errorMessageOnCreate: null,
  errorMessageOnUpdate: null,
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
    getSingleDeck: (state, action) => {
      state.currentDeck = state.items.find(
        (item) => item.id === action.payload.id
      );
    },
    updateDeckStarted: (state) => {
      state.createStatus = "loading";
    },
    updateDeckCompleted: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items[index] = action.payload;
      state.createStatus = "idle";
    },
    createDeckStarted: (state) => {
      state.createStatus = "loading";
    },
    createDeckCompleted: (state, action) => {
      state.createStatus = "idle";
      state.items = [...state.items, action.payload];
    },
    errorMessageOnCreateDeck: (state) => {
      state.createStatus = "idle";
      state.errorMessageOnCreate = "error";
    },
    errorMessageOnFetchDeck: (state) => {
      state.errorMessage = "error";
    },
    errorMessageOnUpdateDeck: (state) => {
      state.errorMessageOnUpdate = "error";
    },
  },
});

export const {
  fetchStarted,
  fetchCompleted,
  createDeckStarted,
  createDeckCompleted,
  updateDeckStarted,
  updateDeckCompleted,
  errorMessageOnCreateDeck,
  errorMessageOnFetchDeck,
  getSingleDeck,
  errorMessageOnUpdateDeck,
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
    console.log("err", error);
    dispatch(errorMessageOnCreateDeck());
  }
};

export const updateDeck = (id, data) => async (dispatch) => {
  try {
    dispatch(updateDeckStarted());
    const deckRef = doc(db, "decks", id);
    await updateDoc(deckRef, data);
    dispatch(updateDeckCompleted({ ...data, id }));
  } catch (error) {
    dispatch(errorMessageOnUpdateDeck());
  } finally {
  }
};

export default deckSlice.reducer;
