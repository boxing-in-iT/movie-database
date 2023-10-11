import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
  isHamburgerOpen: false,
  rankingBy: "day",
  genreListId: "",
  lastLink: "",
  backGroundImage: "",
  activePage: 1,
  filterWindow: false,
  selectredGenres: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    selectRankingBy: (state, action) => {
      state.rankingBy = action.payload;
    },
    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
    setOpenSideBar: (state, action) => {
      state.isOpen = action.payload;
    },
    setOpenHamburger: (state, action) => {
      state.isHamburgerOpen = action.payload;
    },
    setLastLink: (state, action) => {
      state.lastLink = action.payload;
    },
    setBackGroundImage: (state, action) => {
      state.backGroundImage = action.payload;
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
    setFilterWindow: (state, action) => {
      state.activePage = action.payload;
    },
    setSelectedGenres: (state, action) => {
      state.selectredGenres = action.payload;
    },
  },
});

export const {
  selectRankingBy,
  selectGenreListId,
  setOpenSideBar,
  setLastLink,
  setBackGroundImage,
  setActivePage,
  setFilterWindow,
  setSelectedGenres,
  setOpenHamburger,
} = movieSlice.actions;

export default movieSlice.reducer;
