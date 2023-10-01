import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  color: white;
`;

const Loader = () => {
  return (
    <Container>
      <Title>Loading results please wait...</Title>
    </Container>
  );
};

export default Loader;
