import databaseService from "@/services/DatabaseService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ErrorResponseInterface {
  message: string;
  code?: string;
}

interface ReportInterface {
    amount:number,
    reason:string
}

const ReportInitialState  {
    data: ReportInterface[];
    loading:boolean;
    error:string||null;
}

export const getAllReport = createAsyncThunk<
  void,
  { rejectValue: ErrorResponseInterface }
>("reportSlice/getAllReport", async (_, { rejectWithValue }) => {
  try {
    const datas = databaseService.getAllReport();
    return datas;
  } catch (error: any) {
    console.error(error);
    return rejectWithValue({ message: error.message });
  }
});

const reportSlice = createSlice({
    name:"reportSlice",
    initialState:[],
    extraReducers:(builder) =>{

    }

})