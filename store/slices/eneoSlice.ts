import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import databaseService from "@/services/DatabaseService";

interface Compter {
  id: number;
  label: string;
  number: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CreateCompterParams {
  label: string;
  number: string;
}

interface ErrorResponse {
  message: string;
  code?: string;
}

interface GetCompterByIdParams {
  id: number;
}

interface DeleteCompterParams {
  id: number;
}

interface EneoState {
  data: Compter[];
  error: string | null;
  loading: boolean;
  lastUpdated: string | null;
}

// 🔄 Actions asynchrones

export const fetchData = createAsyncThunk<
  Compter[],
  void,
  { rejectValue: ErrorResponse }
>("eneoSlice/fetchData", async (_, { rejectWithValue }) => {
  try {
    const data = await databaseService.getAllCompter();
    return data;
  } catch (error: any) {
    return rejectWithValue({ message: error.message });
  }
});

export const createCompter = createAsyncThunk<
  Compter[],
  CreateCompterParams,
  { rejectValue: ErrorResponse }
>("eneoSlice/createCompter", async ({ number, label }, { rejectWithValue }) => {
  try {
    const result = await databaseService.createCompter(label, number);
    return result;
  } catch (error: any) {
    return rejectWithValue({ message: error?.message });
  }
});

export const getCompterById = createAsyncThunk<
  Compter[],
  GetCompterByIdParams,
  { rejectValue: ErrorResponse }
>("eneoSlice/getCompterById", async ({ id }, { rejectWithValue }) => {
  try {
    const result = await databaseService.getCompterById(id);
    return result;
  } catch (error: any) {
    return rejectWithValue({ message: error.message });
  }
});

// ✅ Correction: Types corrects pour deleteCompter
export const deleteCompter = createAsyncThunk<
  Compter[], // ✅ Retourner la liste mise à jour
  DeleteCompterParams,
  { rejectValue: ErrorResponse }
>("eneoSlice/deleteCompter", async ({ id }, { rejectWithValue }) => {
  try {
    await databaseService.deleteCompter(id);
    // ✅ Récupérer la liste mise à jour après suppression
    const updatedData = await databaseService.getAllCompter();
    return updatedData;
  } catch (error: any) {
    return rejectWithValue({ message: error.message });
  }
});

export const syncWithDatabase = createAsyncThunk<
  Compter[],
  void,
  { rejectValue: ErrorResponse }
>("eneoSlice/syncWithDatabase", async (_, { rejectWithValue }) => {
  try {
    const data = await databaseService.getAllCompter();
    return data;
  } catch (error: any) {
    return rejectWithValue({
      message: error.message || "Erreur de synchronisation",
    });
  }
});

// 🔧 Slice

const initialState: EneoState = {
  data: [],
  error: null,
  loading: false,
  lastUpdated: null,
};

const eneoSlice = createSlice({
  name: "eneo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchData
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.lastUpdated = new Date().toISOString();
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Erreur inconnue";
    });

    // createCompter
    builder.addCase(createCompter.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createCompter.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.lastUpdated = new Date().toISOString();
    });
    builder.addCase(createCompter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Erreur lors de la création";
    });

    // getCompterById
    builder.addCase(getCompterById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCompterById.fulfilled, (state, action) => {
      // ✅ Option: Vous pourriez ajouter une propriété 'selectedCompter' au state
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(getCompterById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Erreur lors de la récupération";
    });

    // deleteCompter
    builder.addCase(deleteCompter.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCompter.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.lastUpdated = new Date().toISOString();
    });
    builder.addCase(deleteCompter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Erreur lors de la suppression";
    });

    // syncWithDatabase
    builder.addCase(syncWithDatabase.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(syncWithDatabase.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.lastUpdated = new Date().toISOString();
    });
    builder.addCase(syncWithDatabase.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload?.message || "Erreur lors de la synchronisation";
    });
  },
});

export default eneoSlice.reducer;
