// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import eneoReducer from "./slices/eneoSlice";

export const store = configureStore({
  reducer: {
    eneo: eneoReducer, // ✅ Le nom doit correspondre à celui utilisé dans le selector
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
