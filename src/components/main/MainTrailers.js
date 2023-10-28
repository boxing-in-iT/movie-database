import React, { useState } from "react";
import styled from "styled-components";
import { useAllTrendingByQuery } from "../../redux/services/tmdb";

const Container = styled.div`
  width: 100%;
  height: 300px;
  background-color: #007bff;
  color: #fff;
  padding: 20px 0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  position: relative;
`;

const Content = styled.div`
  flex: 1;
  padding-left: 20px; /* Add padding to move text to the left */
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 10px 0;
`;

const Cards = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  max-width: 1250px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 250px;
  max-width: 250px;
  padding: 1rem;
  align-items: center;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s;
  margin: 1rem;
  z-index: 1000;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 10px;
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
  opacity: 0.2; /* Increase opacity for a thicker background */
  border-radius: 10px;
  z-index: ${({ bg }) => (bg === "" ? `-1` : "1")};
`;

const MainTrailers = () => {
  const [bgImage, setBgImage] = useState("");
  const {
    data: trendingList,
    isFetching,
    error,
  } = useAllTrendingByQuery("day");

  const changeBgImage = (item) => {
    console.log(bgImage);
    setBgImage(item);
  };

  return (
    <Container>
      <Content>
        <Title>Trailers</Title>
        <Cards>
          {trendingList?.results?.map((data, i) => (
            <Card key={i}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
                onMouseEnter={() => changeBgImage(data.backdrop_path)}
              />
            </Card>
          ))}
        </Cards>
      </Content>
      <BackgroundImage bg={bgImage} />
    </Container>
  );
};

export default MainTrailers;
