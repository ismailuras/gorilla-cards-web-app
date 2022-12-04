import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axiosConfig";

export const getSeedList = createAsyncThunk("decks/getSeedList", async () => {
  const result = await axios.get("/seed");
  return result.data.data;
});

const initialState = {
  seed: [],
  total: 0,
  offset: 0,
  fetchSeedListStatus: "idle",
};

const seekSlice = createSlice({
  name: "seed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSeedList.fulfilled, (state, action) => {
      state.seed = action.payload;
      state.total = action.payload;
      state.offset = action.payload;
      state.status = "idle";
    });
    builder.addCase(getSeedList.rejected, (state) => {
      state.errorMessagesOnFetch = ["unexpected-error"];
      state.status = "idle";
    });
    builder.addCase(getSeedList.pending, (state) => {
      state.status = "loading";
      state.errorMessagesOnFetch = [];
    });
  },
});

export default seekSlice.reducer;
