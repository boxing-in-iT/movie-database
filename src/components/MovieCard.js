import React from "react";
import styled from "styled-components";

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: auto;
  padding: 1rem;
  background-color: rgb(255 255 255 / 0.05);

  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const Card = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Image = styled.img`
  width: 80%;
  height: 100%;
  border-radius: 0.5rem;
`;

const TextDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.25rem;
`;

const Title = styled.div`
  color: rgb(255, 255, 255);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SubTitle = styled.div`
  font-size: 0.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 0.25rem;
`;

const MovieCard = ({ data, onClick }) => {
  return (
    <Cards>
      <Card onClick={() => onClick(data.id)}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt="poster"
        />
      </Card>
      <TextDiv>
        {data.original_title ? <Title>{data.original_title}</Title> : null}
        {data.name ? <Title>{data.name}</Title> : null}
      </TextDiv>
    </Cards>
  );
};

export default MovieCard;
