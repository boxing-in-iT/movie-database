import React from "react";
import styled from "styled-components";
import { BiChevronLeftCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSideBar } from "../redux/features/movieSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Разместите контент внизу контейнера */
  align-items: center;
  color: white;
  height: 100%; /* Заполните доступное пространство по высоте */
`;

const Icon = styled(BiChevronLeftCircle)`
  font-size: 5rem;
  cursor: pointer;

  &:hover {
    color: grey;
  }
`;

const SideBarClose = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { lastLink } = useSelector((state) => state.movie);

  const handleClick = () => {
    dispatch(setOpenSideBar(true));
    navigate(lastLink);
  };

  return (
    <Container>
      <Icon onClick={handleClick} />
    </Container>
  );
};

export default SideBarClose;
