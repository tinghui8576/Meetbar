import React from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";

const ChatRoomBlock = styled.div`
  width: 100%;
  height: 5rem;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }

  &:focus {
    background-color: red;
  }
`;

const ChatRoomName = styled.p`
  font-size: 1.5rem;
  margin-left: 1rem;
  margin-top: 0.5rem;
  overflow: hidden;
  // overflow-wrap: clip;
  text-overflow: ellipsis;
`;

function ChatRoom({ host, name, date, ID, setChatID }) {
  const Openchat = async () => {
    await setChatID(ID);
    console.log(date);
  };
  return (
    <ChatRoomBlock onClick={Openchat}>
      <Avatar sx={{ ml: 2 }}>{host}</Avatar>
      <ChatRoomName> {name} </ChatRoomName>
    </ChatRoomBlock>
  );
}

export default ChatRoom;
