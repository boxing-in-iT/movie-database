import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LogoDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Logo = styled.h2``;

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2.5rem;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuItem = styled.li`
  border: 1px solid black;
  border-radius: 9999px;
  margin-bottom: 1.25rem;
  padding: 5px;
  width: 200%;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgb(214 211 209) !important;
    color: black;
  }
`;

const StyledLink = styled(Link)`
  /* Здесь вы можете задать стили для Link */
  text-decoration: none; /* Пример: убираем подчеркивание */
  color: inherit; /* Пример: наследуем цвет текста */
`;

const SideBarOpen = () => {
  return (
    <>
      <LogoDiv>
        <Logo>TDBM</Logo>
      </LogoDiv>
      <NavBar>
        <Menu>
          <MenuItem>
            <StyledLink to="/">Main</StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/trending">Trending</StyledLink>
          </MenuItem>
          <MenuItem>Your videos</MenuItem>
          <MenuItem>Playlist</MenuItem>
        </Menu>
      </NavBar>
    </>
  );
};

export default SideBarOpen;
