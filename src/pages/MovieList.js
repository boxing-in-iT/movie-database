import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetMovieByKeywordQuery } from "../redux/services/tmdb";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  selectRankingBy,
  setLastLink,
  setOpenSideBar,
} from "../redux/features/movieSlice";

// Styled Components
const Section = styled.section`
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const MovieCard = styled.div`
  width: 48%;
  margin: 10px 0;
  display: flex;
  border-radius: 15px;
  background-color: white;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const MovieCardContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.p`
  cursor: pointer;
  font-weight: 600;
  margin: 0;
  font-size: 1.2rem;
  color: #333;
  transition: color 0.2s;

  &:hover {
    color: #0077b6; /* Change to your desired hover color */
  }
`;

const Overview = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 10px 0;
`;

const MovieList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { keyword } = useParams();

  const {
    data: movies,
    isFetching: fetching,
    error: e,
  } = useGetMovieByKeywordQuery(keyword);

  const handleClick = (id) => {
    dispatch(setOpenSideBar(false));
    dispatch(setLastLink("/trending"));
    navigate(`/movie/${id}`);
  };

  return (
    <Section>
      <Container>
        {movies?.results.map((data) => (
          <MovieCard key={data.id}>
            <ImageContainer>
              <Image
                src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
              />
            </ImageContainer>
            <MovieCardContainer>
              <Title onClick={() => handleClick(data.id)}>{data.title}</Title>
              <Overview>{data.overview}</Overview>
            </MovieCardContainer>
          </MovieCard>
        ))}
      </Container>
    </Section>
  );
};

export default MovieList;
