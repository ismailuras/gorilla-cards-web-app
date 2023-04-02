import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axiosConfig";

export const getSeedList = createAsyncThunk("decks/getSeedList", async () => {
  const result = await axios.get("/seed");
  return result.data.data;
});

const initialState = {
  seed: [],
  seedData: [],
  seedListStatus: "idle",
  errorMessageOnSeedList: [],
};

const seedSlice = createSlice({
  name: "seed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSeedList.fulfilled, (state, action) => {
      state.seed = action.payload;
      state.seedListStatus = "idle";
    });
    builder.addCase(getSeedList.rejected, (state) => {
      state.errorMessageOnSeedList = ["unexpected-error"];
      state.seedListStatus = "idle";
    });
    builder.addCase(getSeedList.pending, (state) => {
      state.seedListStatus = "loading";
      state.errorMessageOnSeedList = [];
    });
  },
});

export default seedSlice.reducer;
