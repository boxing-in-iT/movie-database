import React from "react";
import styled from "styled-components";
import { blackTheme } from "../style";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

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
  justify-content: space-between;
  padding-right: 1.5rem;
`;

const Menu = styled.ul`
  width: 40%;
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
`;

const MenuItem = styled.li`
  color: white;
  padding: 5px;
  width: 200%;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  align-items: center;

  &:hover {
    background-color: rgb(214 211 209) !important;
    color: black;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Header = () => {
  return (
    <Container>
      <NavBar>
        <Menu>
          <MenuItem>
            <StyledLink to="/">Main</StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/movies">Movies</StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/tv">TV</StyledLink>
          </MenuItem>
          <MenuItem>Playlist</MenuItem>
        </Menu>
        <SearchBar />
      </NavBar>
    </Container>
  );
};

export default Header;
