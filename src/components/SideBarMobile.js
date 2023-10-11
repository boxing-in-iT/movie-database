import React from "react";
import styled from "styled-components";
import SideBarOpen from "./SideBarOpen";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: ${(props) => (props.isHamburgerOpen ? "flex" : "none")};
  width: ${(props) => (props.isHamburgerOpen ? "100%" : "0")};
  height: 100vh;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  overflow-y: scroll;
  background-color: #0e1111;
  color: white;
`;

const SideBarMobile = () => {
  const { isHamburgerOpen } = useSelector((state) => state.movie);
  return (
    <Container isHamburgerOpen={isHamburgerOpen}>
      <SideBarOpen />
    </Container>
  );
};

export default SideBarMobile;
