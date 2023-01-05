import React from "react";
import styled from "styled-components";

const StyledMessage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${({ isMe }) => (isMe ? "row-reverse" : "row")};
  margin: 8px 10px;

  & p:first-child {
    max-width: 60vw;
    overflow-wrap: break-word;
    margin: 0 5px;
  }
  & p:last-child {
    max-width: 60vw;
    overflow-wrap: break-word;
    padding: 2px 5px;
    border-radius: 5px;
    background: #eee;
    color: gray;
    margin: auto 0;
  }
`;
const Message = ({ name, isMe, message }) => {
  if (isMe) {
    return (
      <StyledMessage isMe={isMe}>
        <p>{message}</p>
      </StyledMessage>
    );
  } else {
    return (
      <StyledMessage isMe={isMe}>
        <p>{name}</p>
        <p> {message}</p>
      </StyledMessage>
    );
  }
};

export default Message;
