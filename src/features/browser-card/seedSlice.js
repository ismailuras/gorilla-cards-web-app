import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axiosConfig";

export const getSeedList = createAsyncThunk("decks/getSeedList", async () => {
  const result = await axios.get("/seed");
  return result.data.data;
});

const initialState = {
  seed: [],
  seedData: [],
  fetchSeedListStatus: "idle",
};

const seekSlice = createSlice({
  name: "seed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSeedList.fulfilled, (state, action) => {
      state.seed = action.payload;
      state.fetchSeedListStatus = "idle";
    });
    builder.addCase(getSeedList.rejected, (state) => {
      state.errorMessagesOnFetch = ["unexpected-error"];
      state.fetchSeedListStatus = "idle";
    });
    builder.addCase(getSeedList.pending, (state) => {
      state.fetchSeedListStatus = "loading";
      state.errorMessagesOnFetch = [];
    });
  },
});

export default seekSlice.reducer;
