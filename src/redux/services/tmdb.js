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
    byPopularityDesc: builder.query({
      query: (currentPage) =>
        `discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc`,
    }),
    trendingByDay: builder.query({
      query: (trending) => `trending/movie/${trending}?language=en-US`,
    }),
    getMovieBySearch: builder.query({
      query: (searchTerm) =>
        `search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
    }),
    getMiveById: builder.query({
      query: (id) => `movie/${id}?language=en-US`,
    }),
    getActorsById: builder.query({
      query: (id) => `movie/${id}/credits?language=en-US'`,
    }),
    getKeywordsFilm: builder.query({
      query: (id) => `movie/${id}/keywords`,
    }),
    getImagesFromMovie: builder.query({
      query: (id) => `movie/${id}/images`,
    }),
    getMovieByKeyword: builder.query({
      query: (keyword) =>
        `discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_keywords=${keyword}`,
    }),
    getPersonById: builder.query({
      query: (id) => `person/${id}?language=en-US`,
    }),
    getMovieByPersonId: builder.query({
      query: (id) => `person/${id}/movie_credits?language=en-US`,
    }),
    getFilteredMovies: builder.query({
      query: ({ currentPage, filters }) => {
        debugger;
        const { genres, fromDate, toDate } = filters;
        return `discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc${
          genres.length > 0 ? `&with_genres=${genres.join(",")}` : ""
        }${fromDate ? `&release_date.gte=${fromDate}` : ""}${
          toDate ? `&release_date.lte=${toDate}` : ""
        }`;
      },
    }),
  }),
});

export const {
  useByPopularityDescQuery,
  useTrendingByDayQuery,
  useGetMovieBySearchQuery,
  useGetMiveByIdQuery,
  useGetActorsByIdQuery,
  useGetKeywordsFilmQuery,
  useGetImagesFromMovieQuery,
  useGetMovieByKeywordQuery,
  useGetPersonByIdQuery,
  useGetMovieByPersonIdQuery,
  useGetFilteredMoviesQuery,
} = tmdbApi;
