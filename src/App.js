import logo from "./logo.svg";
import "./App.css";
import { styled } from "styled-components";
import Header from "./components/Header";
import Main from "./pages/Main";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Search from "./pages/Search";
import { useSelector } from "react-redux";
import MovieList from "./pages/MovieList";
import ActorPage from "./pages/ActorPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MediaList from "./pages/MediaList";
import { MOVIE_GENRES, TV_SHOW_GENRES } from "./components/genres";

const Section = styled.div`
  position: relative;
  display: flex;
`;

const ContentDiv = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  /* background-image: linear-gradient(to bottom right, #ffffff, #121286); */
  background-color: #393e46;
  position: relative; /* Добавляем относительное позиционирование */

  @media (max-width: 640px) {
    display: ${(props) => (props.isHamburgerOpen ? "none" : "flex")};
  }
`;

const Div2 = styled.div`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  height: 100vh;
  overflow-y: scroll;

  display: flex;
  flex-direction: column-reverse;

  ::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 1280px) {
    flex-direction: row;
  }
`;

const Div3 = styled.div`
  flex: 1 1 0%;
  height: fit-content;
  padding-bottom: 10rem;
`;

const App = () => {
  const { backGroundImage, isHamburgerOpen } = useSelector(
    (state) => state.movie
  );
  return (
    <BrowserRouter>
      <Section>
        <ContentDiv bg={backGroundImage} isHamburgerOpen={isHamburgerOpen}>
          <Header />
          <Div2>
            <Div3>
              <Routes>
                <Route
                  path="/movies"
                  element={
                    <MediaList mediaType="movies" genres={MOVIE_GENRES} />
                  }
                />
                <Route
                  path="/tv"
                  element={
                    <MediaList mediaType="tvshows" genres={TV_SHOW_GENRES} />
                  }
                />
                <Route path="/" element={<Main />} />
                <Route
                  path="/movie/:id"
                  element={<MovieDetailsPage type="movie" />}
                />

                <Route
                  path="/tv/:id"
                  element={<MovieDetailsPage type="tv" />}
                />
                <Route path="/search/:searchTerm" element={<Search />} />
                <Route path="/byKeywords/:keyword" element={<MovieList />} />
                <Route path="/person/:id" element={<ActorPage />} />
              </Routes>
            </Div3>
          </Div2>
        </ContentDiv>
      </Section>
    </BrowserRouter>
  );
};

export default App;
