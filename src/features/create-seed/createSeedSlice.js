import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axiosConfig";

export const createSeed = createAsyncThunk(
  "createSeedByDeckName",
  async ({ id, deckName, offset }) => {
    const res = await axios.post(`/seed/${id}`, {
      deckName,
      offset,
    });
    return res.data.data;
  }
);

const initialState = {
  errorMessagesOnCreateSeed: [],
  createSeedStatus: "idle",
};

const createSeedSlice = createSlice({
  name: "createSeed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createSeed.rejected, (state) => {
      state.errorMessagesOnCreateSeed = ["unexpected-error"];
      state.createSeedStatus = "idle";
    });
  },
});

export default createSeedSlice.reducer;
