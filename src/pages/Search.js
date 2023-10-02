import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetMovieBySearchQuery } from "../redux/services/tmdb";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  color: white;
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

const Search = () => {
  const navigate = useNavigate();
  const { searchTerm } = useParams();
  const { data, isFetching, error } = useGetMovieBySearchQuery(searchTerm);

  const songs = data?.results;

  if (isFetching) return <Loader />;
  if (error) return <Error />;

  const handleCLick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <Section>
      <Title>
        Showing results for <span className="font-black">{searchTerm}</span>
      </Title>
      <CardDiv>
        {songs?.map((data, i) => (
          <MovieCard data={data} onClick={() => handleCLick(data.id)} />
        ))}
      </CardDiv>
    </Section>
  );
};

export default Search;
