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

const Section = styled.section``;

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`;

const MovieCard = styled.div`
  margin-top: 0.5rem;
  min-height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: white;

  border-radius: 50px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
`;

const Image = styled.img`
  width: 10rem;
  border-radius: 25px;
`;

const MovieCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: black;
  margin-left: 2rem;
`;

const Title = styled.p`
  cursor: pointer;
  font-weight: 900;

  &:hover {
    color: blue;
  }
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

  const handleCLick = (id) => {
    dispatch(setOpenSideBar(false));
    dispatch(setLastLink("/trending"));
    navigate(`/movie/${id}`);
  };

  return (
    <Section>
      <Container>
        {movies?.results.map((data, index) => (
          <MovieCard>
            <ImageContainer>
              <Image
                src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
              />
            </ImageContainer>

            <MovieCardContainer>
              <Title onClick={() => handleCLick(data.id)}>{data.title}</Title>
              <p>{data.overview}</p>
            </MovieCardContainer>
          </MovieCard>
        ))}
      </Container>
      {/* <div>
        {movies?.results.map((data, i) => (
          <h1>{data?.title}</h1>
        ))}
      </div> */}
    </Section>
  );
};

export default MovieList;
