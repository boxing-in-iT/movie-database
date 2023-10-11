import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useTrendingByDayQuery } from "../redux/services/tmdb";
import {
  selectRankingBy,
  setLastLink,
  setOpenSideBar,
} from "../redux/features/movieSlice";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
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

const Discover = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { rankingBy, activePage, isOpen } = useSelector((state) => state.movie);
  const { data, isFetching, error } = useTrendingByDayQuery(rankingBy || "day");
  useEffect(() => {
    dispatch(setOpenSideBar(true));
  }, []);

  if (error) return <Error />;

  const handleCLick = (id) => {
    dispatch(setOpenSideBar(false));
    dispatch(setLastLink("/trending"));
    navigate(`/movie/${id}`);
  };

  console.log("WWW: ", data);

  return (
    <Section>
      <Container>
        <Title>Tranding by {rankingBy}</Title>
        <Select
          onChange={(e) => dispatch(selectRankingBy(e.target.value))}
          value={rankingBy || "day"}
        >
          <option value={"day"}>Day</option>
          <option value={"week"}>Week</option>
        </Select>
      </Container>
      <CardDiv>
        {isFetching ? (
          <Loader />
        ) : (
          data?.results.map((data, i) => (
            <MovieCard
              key={i}
              data={data}
              onClick={() => handleCLick(data.id)}
            />
          ))
        )}
      </CardDiv>
      {pagin(20, currentPage, setCurrentPage)}
    </Section>
  );
};

export default Discover;
