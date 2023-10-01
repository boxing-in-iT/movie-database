import { configureStore } from "@reduxjs/toolkit";

import { tmdbApi } from "./services/tmdb";

import movieReducer from "./features/movieSlice";

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    movie: movieReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
