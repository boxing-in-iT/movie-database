import React from "react";
import styled from "styled-components";
import MainHeader from "../components/main/MainHeader";
import MainTrending from "../components/main/MainTrending";
import {
  useAllTrendingByQuery,
  useGetMovieBySearchQuery,
} from "../redux/services/tmdb";
import { useSelector } from "react-redux";
import MainTrailers from "../components/main/MainTrailers";

const Section = styled.section`
  /* min-height: 80%;
  min-width: 80%; */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = () => {
  return (
    <Section>
      <Container>
        <MainHeader />
        <MainTrending />
        <MainTrailers />
      </Container>
    </Section>
  );
};

export default Main;
