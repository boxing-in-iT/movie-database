import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.h1``;

const Error = () => {
  return (
    <Container>
      <Text>Something went wrong, please try again!</Text>
    </Container>
  );
};

export default Error;
