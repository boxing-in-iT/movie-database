import React from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import SideBarOpen from "../components/SideBarOpen";
import SideBarClose from "../components/SideBarClose";

const Container = styled.div`
  width: ${(props) => (props.isOpen ? "15%" : "0")};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  overflow-y: scroll;
  background-color: #0e1111;
  color: white;

  @media (max-width: 640px) {
    display: none;
  }
`;

const SideBar = () => {
  const { isOpen } = useSelector((state) => state.movie);
  return (
    <Container isOpen={isOpen}>
      <SideBarOpen />
    </Container>
  );
};

export default SideBar;
