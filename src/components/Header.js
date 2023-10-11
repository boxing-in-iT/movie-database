import React from "react";
import styled from "styled-components";
import { blackTheme } from "../style";
import SearchBar from "./SearchBar";
import SideBarClose from "./SideBarClose";
import { useDispatch, useSelector } from "react-redux";
import { setOpenHamburger } from "../redux/features/movieSlice";

const Container = styled.div`
  height: 10svh;
  background-color: #0e1111;
  z-index: 1000;
  display: flex;
  align-items: center;
`;

const NavBar = styled.nav`
  margin-left: 1.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  /* justify-content: flex-start; */
  justify-content: space-between;
  padding-right: 1.5rem;
`;

const HamburgerMenu = styled.h4`
  display: none;

  @media (max-width: 640px) {
    display: flex;
    font-size: 1.25rem;
    transform: rotate(90deg);
    color: white;
    cursor: pointer;
  }
`;

const Header = () => {
  const dispatch = useDispatch();

  const openHamburger = () => {
    dispatch(setOpenHamburger(true));
  };

  const { isOpen } = useSelector((state) => state.movie);
  return (
    <Container>
      <NavBar>
        {!isOpen ? <SideBarClose /> : <></>}
        <SearchBar />
        <HamburgerMenu onClick={() => openHamburger()}>|||</HamburgerMenu>
      </NavBar>
    </Container>
  );
};

export default Header;
