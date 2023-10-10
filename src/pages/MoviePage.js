import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  useGetActorsByIdQuery,
  useGetImagesFromMovieQuery,
  useGetKeywordsFilmQuery,
  useGetMiveByIdQuery,
  useGetMovieByKeywordQuery,
} from "../redux/services/tmdb";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  setBackGroundImage,
  setLastLink,
  setOpenSideBar,
} from "../redux/features/movieSlice";
import ActorCard from "../components/ActorCard";
import Media from "../components/Media";

const Section = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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
  opacity: 0.2; /* Измените это значение по вашему усмотрению */
  border-radius: 10px;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  transition: transform 0.3s ease;
  opacity: 1;

  &:hover {
    transform: scale(1.05);
  }
`;

// const Image = styled.img`
//   max-width: 100%;
//   max-height: 100%;
//   border-radius: 10px;
//   box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
// `;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const MovieInfoContainer = styled.div`
  flex: 2;
  padding-left: 2rem; /* Добавляем отступ с левой стороны */
  color: white;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem; /* Добавляем небольшой отступ снизу */
`;

const ReleaseDate = styled.h4`
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const Overview = styled.p`
  font-size: 1rem;
  text-align: left; /* Выравниваем текст по левому краю */
`;

const Cards = styled.div`
  max-width: 1200px;
  margin-top: 2rem;
  display: flex; /* Используем сетку для карточек */

  gap: 1rem; /* Добавим небольшой отступ между карточками */
  overflow-x: auto; /* Уберем горизонтальную прокрутку */
`;

const Div = styled.div`
  display: flex;
`;

const Cast = styled.div`
  width: 70%;
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Keywords = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 1rem;
`;

const Keyword = styled.div`
  background-color: #333;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 1rem;
`;

const MoviePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isOpen, backGroundImage } = useSelector((state) => state.movie);
  const [keyw, setKeyw] = useState("key");

  const { data, isFetching, error } = useGetMiveByIdQuery(id);
  const {
    data: actors,
    isLoading,
    error: actorsError,
  } = useGetActorsByIdQuery(id);
  const {
    data: keywords,
    isFetching: isFetch,
    error: keywordsError,
  } = useGetKeywordsFilmQuery(id);
  const {
    data: images,
    isFetching: isLoaded,
    error: imgError,
  } = useGetImagesFromMovieQuery(id);

  const {
    data: movies,
    isFetching: fetching,
    error: e,
  } = useGetMovieByKeywordQuery(keyw);

  console.log(movies);

  if (isFetching || isLoading || isFetch || isLoaded) return <Loader />;
  if (error || actorsError) {
    // Обработка ошибок
    return <div>Ошибка при загрузке данных</div>;
  }

  const handleCLick = (keyword) => {
    dispatch(setOpenSideBar(false));
    dispatch(setLastLink("/trending"));
    navigate(`/byKeywords/${keyword}`);
  };

  const handleCastClick = (castId) => {
    dispatch(setOpenSideBar(false));
    dispatch(setLastLink(`/movie/${id}`));
    navigate(`/person/${castId}`);
  };

  return (
    <Section>
      <Container>
        <BackgroundImage bg={data?.backdrop_path} />
        <ImageContainer>
          <Image src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} />
        </ImageContainer>
        <MovieInfoContainer>
          <Title>{data?.title}</Title>
          <ReleaseDate>{data?.release_date}</ReleaseDate>
          <Overview>{data?.overview}</Overview>
        </MovieInfoContainer>
      </Container>
      <Div>
        <Cast>
          <Title>Cast</Title>
          <Cards>
            {actors?.cast.map((data) => (
              <ActorCard
                onClick={() => handleCastClick(data.id)}
                data={data}
                type={"movie"}
                key={data.id}
              />
            ))}
          </Cards>
        </Cast>
        <Info>
          <div>Original title</div>
          <div>{data?.original_title}</div>
          <div>Ключові слова</div>
          <Keywords>
            {keywords.keywords.slice(0, 10).map((data) => (
              <Keyword onClick={() => handleCLick(data.name)} key={data.id}>
                {data.name}
              </Keyword>
            ))}
          </Keywords>
        </Info>
      </Div>
      <Media data={images} />
    </Section>
  );
};

export default MoviePage;
