import React, { useEffect, useState, useMemo, useRef } from "react";
import styled from "styled-components";
import {
  useGetImagesFromMovieQuery,
  useGetTrendingImagesQuery,
  useTrendingByDayQuery,
} from "../../redux/services/tmdb";
import { useNavigate } from "react-router-dom";

const Section = styled.div`
  width: 100%;
  height: 300px;
  background-color: #007bff;
  color: #fff;
  padding: 40px 0;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${({ bg }) =>
    bg ? `url(https://image.tmdb.org/t/p/w1280${bg})` : "none"};
  background-size: cover;
  background-position: center;
  opacity: 0.2;
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  z-index: 1000;
`;

const SubTitle = styled.h3`
  font-size: 1.2rem;
  z-index: 1000;
`;

const SearchBox = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 30px;
  overflow: hidden;
  width: 90%;
  z-index: 1000;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 10px 20px;
  font-size: 1.1rem;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  outline: none;
  border-radius: 30px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const MainHeader = () => {
  const navigate = useNavigate();
  const [randomIndex, setRandomIndex] = useState(null);
  const { data, isFetching, error } = useTrendingByDayQuery("day");
  const ids = data ? data.results.map((item) => item.id) : [];
  const {
    data: image,
    isFetching: fetchingImage,
    error: errorImage,
  } = useGetImagesFromMovieQuery(randomIndex);

  const searchInput = useRef(null);

  useEffect(() => {
    if (ids.length > 0) {
      const randomIdx = Math.floor(Math.random() * ids.length);
      setRandomIndex(ids[randomIdx]);
    }
  }, [ids]);

  const handleClick = () => {
    navigate(`/search/${searchInput.current.value}`);
  };

  return (
    <Section>
      <Container>
        <Title>Welcome.</Title>
        <SubTitle>
          Millions of movies, TV shows, and people to discover. Explore now.
        </SubTitle>
        <SearchBox>
          <Input
            type="text"
            placeholder="Search for a movie..."
            ref={searchInput}
          />
          <Button onClick={handleClick}>Search</Button>
        </SearchBox>
        <BackgroundImage bg={image?.backdrops[0].file_path} />
      </Container>
    </Section>
  );
};

export default MainHeader;
