import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { extractErrorMessage } from "../../utils";
import noteService from "./noteService"

const initialState = {
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Get ticket notes
export const getNotes = createAsyncThunk(
  "notes/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getTickets(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
          .addCase(getNotes.pending, (state) => {
            // NOTE: clear single ticket on tickets page, this replaces need for
            // loading state on individual ticket
            state.notes = null;
          })
          .addCase(getNotes.fulfilled, (state, action) => {
            state.notes = action.payload;
          });
    }
})


export const {reset} = noteSlice.actions
export default noteSlice.reducer