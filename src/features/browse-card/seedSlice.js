import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axiosConfig";

export const getSeedList = createAsyncThunk("decks/getSeedList", async () => {
  const result = await axios.get("/seed");
  return result.data.data;
});

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
  seed: [],
  createdSeed: [],
  seedData: [],
  seedListStatus: "idle",
  createSeedStatus: "idle",
  errorMessageOnSeedList: [],
  errorMessagesOnCreateSeed: [],
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
    builder.addCase(createSeed.fulfilled, (state) => {
      state.createSeedStatus = "idle";
    });
    builder.addCase(createSeed.rejected, (state) => {
      state.errorMessagesOnCreateSeed = ["unexpected-error"];
      state.createSeedStatus = "idle";
    });
    builder.addCase(createSeed.pending, (state) => {
      state.createSeedStatus = "loading";
      state.errorMessagesOnCreateSeed = [];
    });
  },
});

export default seedSlice.reducer;
