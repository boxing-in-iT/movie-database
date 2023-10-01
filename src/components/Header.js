import React from "react";
import styled from "styled-components";
import { blackTheme } from "../style";
import SearchBar from "./SearchBar";
import SideBarClose from "./SideBarClose";
import { useSelector } from "react-redux";

const Container = styled.div`
  height: 10svh;
  background-color: #0e1111;
  z-index: 1000;
  display: flex;
  align-items: center;
`;

const NavBar = styled.nav`
  margin-left: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Header = () => {
  const { isOpen } = useSelector((state) => state.movie);
  return (
    <Container>
      <NavBar>
        {!isOpen ? <SideBarClose /> : <></>}
        <SearchBar />
      </NavBar>
    </Container>
  );
};

export default Header;
