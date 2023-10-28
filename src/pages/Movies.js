import React, { useEffect, useState, useRef } from "react";
import MovieCard from "../components/MovieCard";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  useByPopularityDescQuery,
  useGetFilteredMoviesQuery,
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

const Select = styled.select`
  background-color: black;
  color: rgb(209 213 219);
  padding: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  border-radius: 0.5rem;
  outline: none;
  margin-top: 1.25rem;
  @media (max-width: 640px) {
    margin-top: 0px;
  }
`;

const Movies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    genres: [], // Выбранные жанры
    fromDate: null, // Начальная дата
    toDate: null, // Конечная дата
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activePage, isOpen, filterWindow } = useSelector(
    (state) => state.movie
  );
  const topElementRef = useRef(null);

  const { data, isFetching, error } = useByPopularityDescQuery(currentPage);

  const {
    data: filter,
    isFetching: loading,
    error: err,
  } = useGetFilteredMoviesQuery({
    currentPage: currentPage,
    filters: selectedFilters,
  });

  useEffect(() => {
    dispatch(setOpenSideBar(true));
  }, []);

  useEffect(() => {
    if (topElementRef.current) {
      window.scrollTo({
        top: topElementRef.current.offsetTop,
        behavior: "smooth", // Добавляет плавную анимацию прокрутки
      });
    }
  }, [currentPage]);

  if (isFetching) return <Loader />;
  if (err) return <Error />;

  const handleCLick = (id) => {
    dispatch(setOpenSideBar(false));
    dispatch(setLastLink("/trending"));
    navigate(`/movie/${id}`);
  };

  const FilterCLoseOpen = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <Section ref={topElementRef}>
      {!filterOpen ? (
        <>
          <Container>
            <Title>Filter</Title>
            <FilterButton onClick={() => FilterCLoseOpen()}> |||</FilterButton>
          </Container>
        </>
      ) : (
        <>
          <FilterWindow
            onClick={FilterCLoseOpen}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            setFilterOpen={setFilterOpen}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
      <CardDiv>
        {filter?.results.map((data, i) => (
          <MovieCard key={i} data={data} onClick={() => handleCLick(data.id)} />
        ))}
      </CardDiv>
      {pagin(500, currentPage, setCurrentPage)}
    </Section>
  );
};

export default Movies;
