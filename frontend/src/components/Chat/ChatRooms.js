import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import ChatRoom from "./ChatRoom";

const ChatRoomWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  gap: 0.5rem;
  border-right: 1px solid #f5f5f5;
  border-top-right-radius: 0.3em;
`;

function ChatRooms({ account, data, setChatID }) {
  return (
    <ChatRoomWrapper>
      <Typography
        variant="h5"
        py={1}
        pl={1}
        bgcolor="#1877f2"
        color="#FFFFFF"
        fontWeight={600}
      >
        聊天室
      </Typography>
      {data ? (
        <>
          {data.myPost.posts.map((items) => {
            console.log(items);
            const d = new Date(items.date),
              dformat =
                [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
                " " +
                [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
            return (
              <ChatRoom
                key={items.id}
                host={items.host.name}
                setChatID={setChatID}
                ID={items.id}
                name={items.title}
                date={dformat}
              />
            );
          })}
        </>
      ) : (
        <></>
      )}
    </ChatRoomWrapper>
  );
}

export default ChatRooms;
