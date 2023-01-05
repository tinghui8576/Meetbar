import { useEffect, useState } from "react";
import Singlepost from "./Singlepost";
import { useQuery, useSubscription } from "@apollo/client";
import { ALLPOST_QUERY } from "../../graphql/queries/allpost_query";
import { POST_CREATED_SUBSCRIPTION } from "../../graphql/subscriptions";
import { MYPOST_QUERY } from "../../graphql/queries/mypost_query";
import { useNavigate } from "react-router-dom";
import { POST_ATTENDED_SUBSCRIPTION } from "../../graphql/postsub";
import { usePost } from "../NewPost/hooks/usePost";
import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";

function Home({ account, setMyPost, user }) {
  const { allPostData, myPostData, setAccountHook } = usePost();
  const navigate = useNavigate();
  useEffect(() => {
    setAccountHook(account);
  }, [account]);
  const handlePost = () => {
    navigate("/newpost");
  };

  return (
    <Grid align="center">
      <Paper
        elevation={3}
        sx={{
          width: "72%",
          maxWidth: 750,
          height: 100,
          my: 2,
          mx: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Avatar sx={{ width: 60, height: 60, bgcolor: "#FFAA33" }}>
          {user}
        </Avatar>
        <Button
          disableElevation
          variant="contained"
          sx={{
            width: "75%",
            height: 60,
            borderRadius: 10,
            color: "black",
            bgcolor: "#DFDFE2",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#B4B4BB",
            },
          }}
          onClick={handlePost}
        >
          <Typography>哈囉，{user}！ 想舉辦甚麼活動呢?</Typography>
        </Button>
      </Paper>
      {allPostData.allPost.map((items) => {
        const d = new Date(items.date),
          dformat =
            [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") +
            " " +
            [
              d.getHours(),
              d.getMinutes(),
              // d.getSeconds()
            ].join(":");

        return (
          <Singlepost
            key={items.id}
            ID={items.id}
            account={account}
            username={user}
            title={items.title}
            type={items.category}
            participant={items.users}
            attended={
              myPostData
                ? myPostData.myPost.posts.some((post) => post.id === items.id)
                : false
            }
            host={items.host.name}
            location={items.location}
            content={items.context}
            date={dformat}
          />
        );
      })}
    </Grid>
  );
}

export default Home;
