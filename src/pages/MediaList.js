// MediaList.js
import React, { useEffect, useState, useRef } from "react";
import MovieCard from "../components/MovieCard";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  useByPopularityDescQuery,
  useGetFilteredMoviesQuery,
  useGetFilteredTvQuery,
} from "../redux/services/tmdb";
import {
  selectRankingBy,
  setLastLink,
  setOpenSideBar,
} from "../redux/features/movieSlice";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import FilterWindow from "../components/FilterWindow";
import { pagin } from "../components/Pagination";

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: row;
    flex-direction: column;
    margin-top: 4em;
    margin-bottom: 10em;
  }
`;

const CardDiv = styled.div`
  margin-top: 2.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: rgb(255 255 255);
  gap: 2rem;
  @media (max-width: 640px) {
    justify-content: flex-start;
  }
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 1.875rem;
  line-height: 2.25rem;
  color: rgb(255 255 255);
  text-align: left;
`;

const FilterButton = styled.h2`
  font-weight: bold;
  font-size: 1.875rem;
  line-height: 2.25rem;
  color: rgb(255 255 255);
  text-align: left;
  cursor: pointer;
  transform: rotate(90deg);
`;

const MediaList = ({ mediaType, genres }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    genres: [],
    fromDate: null,
    toDate: null,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activePage, isOpen, filterWindow } = useSelector(
    (state) => state.movie
  );
  const topElementRef = useRef(null);

  const mediaQuery =
    mediaType === "movies" ? useGetFilteredMoviesQuery : useGetFilteredTvQuery;

  const {
    data: filter,
    isFetching: loading,
    error: err,
  } = mediaQuery({
    currentPage: currentPage,
    filters: selectedFilters,
  });

  useEffect(() => {
    if (topElementRef.current) {
      window.scrollTo({
        top: topElementRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  }, [currentPage]);

  if (loading) return <Loader />;
  if (err) return <Error />;

  const handleClick = (id) => {
    if (mediaType === "movies") {
      dispatch(setOpenSideBar(false));
      dispatch(setLastLink("/trending"));
      navigate(`/movie/${id}`);
    } else if (mediaType === "tvshows") {
      navigate(`/tv/${id}`);
    }
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <Section ref={topElementRef}>
      {!filterOpen ? (
        <>
          <Container>
            <Title>Filter</Title>
            <FilterButton onClick={() => toggleFilter()}> |||</FilterButton>
          </Container>
        </>
      ) : (
        <>
          <FilterWindow
            onClick={toggleFilter}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            setFilterOpen={setFilterOpen}
            setCurrentPage={setCurrentPage}
            genres={genres}
          />
        </>
      )}
      <CardDiv>
        {filter?.results.map((data, i) => (
          <MovieCard key={i} data={data} onClick={() => handleClick(data.id)} />
        ))}
      </CardDiv>
      {pagin(500, currentPage, setCurrentPage)}
    </Section>
  );
};

export default MediaList;
