import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectRankingBy,
  setLastLink,
  setOpenSideBar,
} from "../../redux/features/movieSlice";
import { useNavigate } from "react-router-dom";
import { useAllTrendingByQuery } from "../../redux/services/tmdb";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const TitleBox = styled.div`
  display: flex;
  width: 15%;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
`;

const Selector = styled.div`
  margin-left: 1rem;
  display: flex;
  border: 1px solid black;
  border-radius: 15px;
`;

const SelectButton = styled.button`
  /* margin: 1rem; */
  border: none;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.isSelected ? "#007bff" : "transparent"};
  border-radius: 15px;
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

  &:hover {
    transform-x: 2rem;
  }
`;

const Image = styled.img`
  width: 70%;
  height: auto;
  border-radius: 0.5rem;
`;

const MainTrending = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tradingBy, setTradingBy] = useState("day");
  const { rankingBy } = useSelector((state) => state.movie);

  const {
    data: trendingList,
    isFetching: fetchinTrending,
    error: errorWhenFetching,
  } = useAllTrendingByQuery(tradingBy);

  const handleClick = () => {
    tradingBy === "day" ? setTradingBy("week") : setTradingBy("day");
  };

  const goToMoviePage = (id) => {
    dispatch(setOpenSideBar(false));
    dispatch(setLastLink("/"));
    navigate(`/movie/${id}`);
  };

  const goToTvPage = (id) => {
    dispatch(setOpenSideBar(false));
    dispatch(setLastLink("/"));
    navigate(`/tv/${id}`);
  };

  const handleCardClick = (data) => {
    if (data.media_type === "movie") {
      goToMoviePage(data.id);
    } else if (data.media_type === "tv") {
      goToTvPage(data.id);
    }
  };

  return (
    <Container>
      <TitleBox>
        <Title>Trending</Title>
        <Selector>
          <SelectButton onClick={handleClick} isSelected={tradingBy === "day"}>
            Day
          </SelectButton>
          <SelectButton onClick={handleClick} isSelected={tradingBy === "week"}>
            Week
          </SelectButton>
        </Selector>
      </TitleBox>

      <Cards>
        {trendingList?.results.map((data, i) => (
          <Card onClick={() => handleCardClick(data)} key={i}>
            <Image src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} />
            {data.title ? <h3>{data.title}</h3> : <></>}
            {data.original_name ? <h3>{data.original_name}</h3> : <></>}
          </Card>
        ))}
      </Cards>
    </Container>
  );
};

export default MainTrending;
