import React from "react";
// import { Button, Wrapper, Title } from "./Login";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PreMainWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0em 3em;
`;

function PreMain() {
  const navigate = useNavigate();

  return (
    <></>
    // <Wrapper>
    //   <PreMainWrapper>
    //     <Title>The Event App</Title>
    //     <Button onClick={() => navigate("login")}>Log In</Button>
    //   </PreMainWrapper>
    // </Wrapper>
  );
}

export default PreMain;
