import React from "react";
import styled from "styled-components";
import ava from "../assets/img/anon.jpg";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* Добавим выравнивание по центру */
  background-color: white;
  color: black;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s; /* Добавим плавное изменение размера при наведении */
  cursor: pointer;

  &:hover {
    transform: scale(1.05); /* Увеличим размер при наведении мыши */
  }
`;

const Image = styled.img`
  width: 10rem;
  height: 15rem; /* Установим фиксированную высоту для изображения */
  border-radius: 0.5rem;
  object-fit: cover; /* Избегаем искажений изображения */
`;

const ActorCard = ({ data, onClick }) => {
  return (
    <Card onClick={onClick}>
      {data?.profile_path ? (
        <Image src={`https://image.tmdb.org/t/p/w500${data?.profile_path}`} />
      ) : (
        <Image src={ava} />
      )}

      <div>{data.name}</div>
      <div>{data.character}</div>
    </Card>
  );
};

export default ActorCard;
