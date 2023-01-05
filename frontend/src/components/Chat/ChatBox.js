import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { usePost } from "../NewPost/hooks/usePost";
import Message from "./Message";
import { CREATE_MESSAGE } from "../../graphql/createMessage";
import { useMutation } from "@apollo/client";
import { IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
const FootRef = styled.div`
  height: 30px;
`;

const ChatBoxWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 50px;
  flex-direction: column;
  justify-content: space-between;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  border-top-left-radius: 0.3em;
  min-height: 3rem;
  background-color: #1877f2;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatMessages = styled.div`
  height: 100%;
  overflow: auto;
`;

const DefultMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputForm = styled.form`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 90%;
  height: 80%;
`;

const InputButton = styled.button`
  width: 5rem;
  height: 80%;
  color: #f5f5f5;
  background-color: #1877f2;
  cursor: pointer;
  &:hover {
    background-color: #63adf8;
  }
`;

function ChatBox({ user, account, ChatID, info, toggleDrawer }) {
  const [createMsg] = useMutation(CREATE_MESSAGE);
  const { setID, postMsgData } = usePost();
  const msgFooter = useRef([]);

  // console.log(ChatID)
  useEffect(() => {
    setID(ChatID);
  }, [ChatID]);
  // console.log(postMsgData)
  const [messages, setMessages] = useState([]);
  const [body, setBody] = useState("");
  // console.log(messages)

  const handleSubmit = async () => {
    console.log(body);
    if (body) {
      await createMsg({
        variables: {
          id: ChatID,
          sender: account,
          body: body,
        },
      });
    }

    setMessages([...messages, body]);
    // setMessages([...postMsgData.postMsg]);
    setBody("");
    scrollToBottom(ChatID)
  };

  const clearMessages = () => {
    setMessages([]);
  };
  const scrollToBottom = (index) => {
    msgFooter.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  // console.log(info)
  return (
    <ChatBoxWrapper>
      {ChatID ? (
        <>
          <HeaderWrapper>
            <Typography variant="h4" ml={2} color="#F5F5F5">
              {" "}
              {info.title}{" "}
            </Typography>
            <IconButton text="Event info" onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ color: "#F5F5F5" }} />
            </IconButton>
          </HeaderWrapper>
          <ChatMessages>
            {/* {messages.map((message, i) => (
                        <p key={i}> {message} </p>
                      ))} */}
            {postMsgData === undefined ? (
              <p></p>
            ) : (
              <>
                {postMsgData.postMsg.map((message, i) => (
                  <Message
                    name={message.name}
                    key={i}
                    isMe={message.sender === account}
                    message={message.body}
                  >
                    {/* <p key={i}> {message.body} </p> */}
                  </Message>
                ))}

                <FootRef
                  ref={(el) => (msgFooter.current[ChatID] = el)}
                ></FootRef>
              </>
            )}
          </ChatMessages>
          <InputForm
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Input
              type={"text"}
              placeholder="輸入訊息..."
              value={body}
              style={{ backgroundColor: "#F5F5F5" }}
              onChange={(e) => {
                setBody(e.target.value);
              }}
            />
            <InputButton
              onClick={() => {
                handleSubmit();
              }}
            >
              傳送訊息
            </InputButton>
          </InputForm>
        </>
      ) : (
        <DefultMessage>請選擇聊天室開啟對話</DefultMessage>
      )}
      {/*  */}
    </ChatBoxWrapper>
  );
}

export default ChatBox;
