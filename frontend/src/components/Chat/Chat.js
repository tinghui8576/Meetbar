import styled from "styled-components";
import ChatRooms from "./ChatRooms";
import ChatBox from "./ChatBox";
import { usePost } from "../NewPost/hooks/usePost";
import EventInfo from "./EventInfo";
import { useState, useEffect } from "react";
import { Drawer, Button, Paper, Box, Grid } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";

const Wrapper = styled.div`
  height: 93vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatWrapper = styled.div`
  width: 100vw;
  height: 100%;
  background-color: lightgrey;
  display: flex;
`;

const Chat = ({ user, account }) => {
  const { myPostData: data } = usePost();
  const [ChatID, setChatID] = useState("");
  const [info, setInfo] = useState([]);
  const [time, setTime] = useState(Date());

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  useEffect(() => {
    if (data.myPost) {
      data.myPost.posts.map((items) => {
        if (items.id === ChatID) {
          const d = new Date(items.date),
            dformat =
              [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
              " " +
              [d.getHours(), d.getMinutes()].join(":");
          setTime(dformat);
          setInfo(items);
        }
      });
    }
  }, [ChatID]);

  return (
    <Wrapper>
      {/* <ChatWrapper>
        <ChatRooms account={account} data={data} setChatID={setChatID} />
        <ChatBox
          user={user}
          account={account}
          ChatID={ChatID}
          info={info}
          toggleDrawer={toggleDrawer}
        />
      </ChatWrapper> */}
      <Grid container spacing={1}>
        <Grid item xs={2} md={3}>
          <Paper
            elevation={10}
            sx={{
              height: "90vh",
            }}
          >
            <ChatRooms account={account} data={data} setChatID={setChatID} />
          </Paper>
        </Grid>
        <Grid item xs={10} md={9}>
          <Paper elevation={10} sx={{ height: "90vh" }}>
            <ChatBox
              user={user}
              account={account}
              ChatID={ChatID}
              info={info}
              toggleDrawer={toggleDrawer}
            />{" "}
          </Paper>
        </Grid>
      </Grid>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ "& .MuiDrawer-paper": { width: 300 } }}
      >
        <EventInfo ChatID={ChatID} info={info} time={time} />
      </Drawer>
    </Wrapper>
  );
};

export default Chat;
