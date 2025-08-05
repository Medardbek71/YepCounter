import databaseService from "@/services/DatabaseService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ErrorResponseInterface {
  message: string;
  code?: string;
}

interface Report {
  id: string;
  amount: number;
}

const initialState = {
  reports: [],
  error: null,
  loading: false,
};

export const getAllReport = createAsyncThunk<
  Report[],
  void,
  { rejectValue: ErrorResponseInterface }
>("reportSlice/getAllReport", async (_, { rejectWithValue }) => {
  try {
    const datas = await databaseService.getAllReport();
    return datas;
  } catch (error: any) {
    console.error(error);
    return rejectWithValue({ message: error.message });
  }
});

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllReport.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllReport.fulfilled, (state, action) => {
      state.loading = false;
      state.reports = action.payload;
    });
    builder.addCase(getAllReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Erreur inconnue";
    });
  },
});

export default reportSlice.reducer;
