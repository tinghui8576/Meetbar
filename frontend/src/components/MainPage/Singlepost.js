import { ATTEND_POST_MUTATION } from "../../graphql/attend_post";
import { useMutation } from "@apollo/client";
import {
  Avatar,
  Paper,
  Typography,
  Button,
  Grid,
  unstable_ClassNameGenerator,
} from "@mui/material";
import { useState, useEffect } from "react";

function Home({
  account,
  username,
  host,
  ID,
  title,
  content,
  date,
  type,
  location,
  participant,
  attended,
}) {
  const [attendedButton, setAttendedButton] = useState(false);
  const [attend] = useMutation(ATTEND_POST_MUTATION);
  // console.log("ID", ID)
  // console.log("participant", participant)
  // console.log("account", account)
  // useEffect(() => {
  //   // check if host
  //   if (host === username) setAttended(true);
  //   participant.map((participant)=>{
  //     if(participant.account === account) setAttended(true)
  //     console.log("participant.account", participant.account)})
  //   // check if attended
  // },[participant]);
  // console.log(attended)
  const handleAttend = async () => {
    const d = await attend({
      variables: {
        id: ID,
        account: account,
      },
    });
    setAttendedButton(true);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "72%",
        maxWidth: 750,
        height: 300,
        my: 2,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "15%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ mx: 1 }}>{host}</Avatar>
        <Typography variant="body1">{host}</Typography>
      </div>
      <div
        style={{
          width: "100%",
          height: "70%",
          padding: "0.2em 0.3em 0 0.3em",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography
          variant="h4"
          width="100%"
          height="min-content"
          textAlign="left"
          fontWeight="600"
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          width="100%"
          maxHeight="35%"
          overflow="auto"
          textAlign="left"
          // border="1px solid rgba(0, 0, 0, 0.2)"
          borderRadius="0.3em"
          mt="-20px"
          mb="10px"
          ml={0.5}
        >
          {content}
        </Typography>
        <Typography variant="h3" sx={{ mx: 1 }}>
          {date}
        </Typography>
        <Typography variant="h2" sx={{ mx: 1 }}>
          {location}
        </Typography>
      </div>
      <div
        style={{
          width: "100%",
          height: "15%",
          padding: "0 0.5em",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="subtitle1" color={"primary"} marginLeft={1}>
          {type}
        </Typography>
        {attended||attendedButton ? (
          <Button variant="contained" color="success" onClick={handleAttend}>
            已參加
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              bgcolor: "#D77047",
              "&:hover": {
                bgcolor: "#DE8A68",
              },
            }}
            onClick={handleAttend}
          >
            參加
          </Button>
        )}
      </div>
    </Paper>
  );
}

export default Home;
