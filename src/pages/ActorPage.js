import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  useGetMovieByPersonIdQuery,
  useGetPersonByIdQuery,
} from "../redux/services/tmdb";
import ActorCard from "../components/ActorCard";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { setLastLink, setOpenSideBar } from "../redux/features/movieSlice";

const Section = styled.section`
  width: 80%;
  margin: 0 auto;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const LeftBox = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const Image = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  /* width: 20rem;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); */
`;

const ActorInfo = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
`;

const RightBox = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`;

const Name = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Biography = styled.p`
  font-size: 1rem;
  line-height: 1.4;
`;

const Cards = styled.div`
  max-width: 1200px;
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  overflow-x: auto;
`;

const Div = styled.div`
  display: flex;
`;

const Cast = styled.div`
  width: 100%;
`;

const ActorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isFetching, error } = useGetPersonByIdQuery(id);
  const {
    data: movies,
    isFetching: moviesLoading,
    error: moviesError,
  } = useGetMovieByPersonIdQuery(id);

  const handleClick = (id) => {
    dispatch(setOpenSideBar(false));
    dispatch(setLastLink("/trending"));
    navigate(`/movie/${id}`);
  };

  console.log(data);

  if (isFetching || moviesLoading) return <Loader />;

  return (
    <Section>
      <LeftBox>
        <Image src={`https://image.tmdb.org/t/p/w500${data?.profile_path}`} />
        <p>Personal Info</p>
        <p>Known For</p>
        <p>{data.known_for_department}</p>
        <p>Birthday</p>
        <p>{data.birthday}</p>
        <p>Place of Birth</p>
        <p>{data.place_of_birth}</p>
        <p>Also known as</p>
        {data?.also_known_as.map((data, i) => (
          <p>{data}</p>
        ))}
      </LeftBox>
      <RightBox>
        <Name>{data?.name}</Name>
        <p>Biography</p>
        <Biography>{data?.biography}</Biography>
        <p>Known For</p>
        <Cast>
          <Cards>
            {movies.cast?.map((data) => (
              <ActorCard
                onClick={() => handleClick(data.id)}
                data={data}
                key={data.id}
                type={"actor"}
              />
            ))}
          </Cards>
        </Cast>
      </RightBox>
    </Section>
  );
};

export default ActorPage;
