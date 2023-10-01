import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  useGetMovieByPersonIdQuery,
  useGetPersonByIdQuery,
} from "../redux/services/tmdb";
import ActorCard from "../components/ActorCard";
import Loader from "../components/Loader";

const Section = styled.section`
  margin-top: 2rem;
  width: 90%;
  margin: 0 auto;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftBox = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Image = styled.img`
  width: 20rem;
  border-radius: 15px;
`;

const Social = styled.div`
  display: flex;
  gap: 2rem;
`;

const RightBox = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
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

const ActorPage = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetPersonByIdQuery(id);
  const {
    data: movies,
    isFetching: moviesLoading,
    error: moviesError,
  } = useGetMovieByPersonIdQuery(id);
  console.log(movies);

  if (isFetching || moviesLoading) return <Loader />;

  return (
    <Section>
      <Container>
        <LeftBox>
          <Image src={`https://image.tmdb.org/t/p/w500${data?.profile_path}`} />
          <Social></Social>
        </LeftBox>
        <RightBox>
          <p>{data?.name}</p>
          <p>Biography:</p>
          <p>{data?.biography}</p>
          {/* <Div>
            <Cast>
              <Cards>
                {data?.cast.map((data) => (
                  <ActorCard data={data} key={data.id} />
                ))}
              </Cards>
            </Cast>
          </Div> */}
        </RightBox>
      </Container>
    </Section>
  );
};

export default ActorPage;
