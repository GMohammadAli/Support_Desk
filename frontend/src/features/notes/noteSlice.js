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
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getNotes(ticketId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Create a ticket note
export const createNote = createAsyncThunk(
  "notes/create",
  async (noteText, ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.createNote(noteText, ticketId, token);
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
          })
          .addCase(createNote.fulfilled, (state, action) => {
            state.notes.push(action.payload);
          });
    }
})


export const {reset} = noteSlice.actions
export default noteSlice.reducer