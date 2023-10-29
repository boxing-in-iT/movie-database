import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTI2MjM5NDU1YTk2YWIwZWZiZjU3NWEyMGI0YjBhZCIsInN1YiI6IjY0ZmNlMzFjZGMxY2I0MDBjOGJmZjg0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WshukoOlWbKlUeu4mU_ICGaVRs98Thsj17fPbxAIFiM"
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTvTrailersById: builder.query({
      query: (ids) => `tv/${ids}/videos?language=en-US`,
    }),
    getTvShows: builder.query({
      query: (page) =>
        `discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`,
    }),
    getTvShowById: builder.query({
      query: (id) => `movie/${id}?language=en-US`,
    }),
    getFilteredTv: builder.query({
      query: ({ currentPage, filters }) => {
        debugger;
        const { genres, fromDate, toDate } = filters;
        return `discover/tv?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc${
          genres.length > 0 ? `&with_genres=${genres.join(",")}` : ""
        }${fromDate ? `&release_date.gte=${fromDate}` : ""}${
          toDate ? `&release_date.lte=${toDate}` : ""
        }`;
      },
    }),
    getActingByTvId: builder.query({
      query: (id) => `tv/${id}/credits?language=en-US`,
    }),
  }),
});

export const {
  useGetFilteredTvQuery,
  useGetTvShowByIdQuery,
  useGetTvShowsQuery,
  useGetTvTrailersByIdQuery,
  useGetActingByTvIdQuery,
} = tmdbApi;
