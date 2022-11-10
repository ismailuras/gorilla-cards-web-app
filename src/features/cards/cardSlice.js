import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "firebaseConfig";

export const createCards = createAsyncThunk(
  "cards/createCards",
  async (data) => {
    const user = auth.currentUser;
    const requestData = { ...data, author: user.uid };
    const result = await addDoc(collection(db, "cards"), requestData);
    const { id } = result;
    const newData = { ...data, id, author: user.uid };
    return { data, ...newData };
  }
);

const initialState = {
  cards: [],
  status: null,
  errorMessageOnCreateCards: null,
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCards.fulfilled, (state, action) => {
      state.cards = [...state.cards, action.payload];
      state.status = "idle";
    });
    builder.addCase(createCards.rejected, (state) => {
      state.errorMessageOnCreateCards = true;
      state.status = "idle";
    });
    builder.addCase(createCards.pending, (state) => {
      state.status = "loading";
    });
  },
});

export default cardSlice.reducer;
