import React, { useState } from "react";
import styled from "styled-components";
import { Paper, Typography, Box } from "@mui/material";

const EventImage = styled.img`
  margin: 0.5em;
`;

const EventTitle = styled.h1`
  margin: 0em 0.25em 0.5em 0.25em;
  border-bottom: 1px solid black;
`;

const EventContext = styled.div`
  margin: 0 0 2em 0.75em;
`;

const EventDetails = styled.div`
  margin-left: 0.75em;
`;

const Detail = styled.div``;

function EventInfo({ ChatID, info, time }) {
  const img = require("./images.jpg");

  return (
    <Paper sx={{ height: "100%", px: 2 }}>
      <Typography variant="h5" mx={-2} py={2} px={2} bgcolor="#FFAA33">
        活動資訊
      </Typography>
      <Typography variant="h4" fontWeight={600} mt={3}>
        {info.title}
      </Typography>
      <Typography
        width="100%"
        height={100}
        wordbreak="break-all"
        overflow="auto"
        textAlign="left"
        border="1px solid rgba(0, 0, 0, 0.2)"
        borderRadius="0.3em"
      >
        {info.context ? info.context : "This event has no decription"}
      </Typography>
      <Typography variant="h5" mt={5}>
        {time}
      </Typography>
      <Typography variant="h5">{info.category}</Typography>
      <Typography variant="h5">{info.location}</Typography>
    </Paper>
  );
}

export default EventInfo;
