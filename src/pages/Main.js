import React, { useEffect, useState } from "react";
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

const Main = () => {
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
  const {
    data: filter,
    isFetching: loading,
    error: err,
  } = useGetFilteredMoviesQuery(selectedFilters);

  useEffect(() => {
    dispatch(setOpenSideBar(true));
  }, []);

  if (loading) return <Loader />;

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
    <Section>
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
          />
        </>
      )}
      <CardDiv>
        {filter?.results.map((data, i) => (
          <MovieCard key={i} data={data} onClick={() => handleCLick(data.id)} />
        ))}
      </CardDiv>
    </Section>
  );
};

export default Main;
