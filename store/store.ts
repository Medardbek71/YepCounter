import { configureStore } from "@reduxjs/toolkit";
import eneoSliceReducer from "./slices/eneoSlice";

const store = configureStore({
  reducer: {
    eneo: eneoSliceReducer,
  },
});
