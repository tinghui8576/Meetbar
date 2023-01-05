import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_POST_MUTATION } from "../../graphql/create_post";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  Paper,
  Typography,
  IconButton,
  TextField,
  Grid,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";

function Post({ account }) {
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("新北");
  const [type, setType] = useState("飯局");
  const [content, setContent] = useState("");
  const [NoTitle, setNoTitle] = useState(false);

  const [createpost] = useMutation(CREATE_POST_MUTATION);
  const navigate = useNavigate();

  const PickDate = async (d) => {
    const Now = new Date();
    if (d > Now) setDate(d);
    else {
      console.log("Date is smaller");
    }
  };

  const handleAdd = async () => {
    console.log(content, date, place, type, account, title);
    if (title === "") setNoTitle(true);
    else {
      createpost({
        variables: {
          input: {
            title: title,
            date: date,
            category: type,
            location: place,
            context: content,
          },
          account: account,
        },
      });

      console.log("A new post added!");
      navigateHome();
    }
  };

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <Paper
      elevation={8}
      sx={{
        width: "50vw",
        minWidth: 370,
        height: 700,
        mx: "auto",
        my: "10vh",
      }}
    >
      <IconButton
        sx={{
          width: "2em",
          height: "2em",
          bgcolor: "#D77047",
          color: "#FFFFFF",
          mt: 1,
          ml: 1,
          "&:hover": {
            bgcolor: "#DE8A68",
          },
        }}
        onClick={() => navigate("/")}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h3" fontWeight={600} ml={9}>
        Create Post
      </Typography>
      <Grid sx={{ mx: 9 }}>
        <TextField
          required
          fullWidth
          label="Title"
          variant="standard"
          placeholder="The title of your event"
          margin="normal"
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          multiline
          fullWidth
          minRows={3}
          maxRows={5}
          label="Description"
          variant="outlined"
          placeholder="Descripe your event"
          margin="normal"
          onChange={(e) => setContent(e.target.value)}
        />

        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel>Event Type</InputLabel>
          <Select
            value={type}
            label="Event Type"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value={"戶外"}>戶外</MenuItem>
            <MenuItem value={"藝文"}>藝文</MenuItem>
            <MenuItem value={"飯局"}>飯局</MenuItem>
            <MenuItem value={"其它"}>其它</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ my: 2 }}>
          <InputLabel>Location</InputLabel>
          <Select
            value={place}
            label="Location"
            onChange={(e) => setPlace(e.target.value)}
          >
            <MenuItem value="基隆">基隆</MenuItem>
            <MenuItem value="台北">台北</MenuItem>
            <MenuItem value="新北">新北</MenuItem>
            <MenuItem value="桃園">桃園</MenuItem>
            <MenuItem value="新竹">新竹</MenuItem>
            <MenuItem value="宜蘭">宜蘭</MenuItem>
            <MenuItem value="苗栗">苗栗</MenuItem>
            <MenuItem value="台中">台中</MenuItem>
            <MenuItem value="彰化">彰化</MenuItem>
            <MenuItem value="雲林">雲林</MenuItem>
            <MenuItem value="嘉義">嘉義</MenuItem>
            <MenuItem value="花蓮">花蓮</MenuItem>
            <MenuItem value="台南">台南</MenuItem>
            <MenuItem value="高雄">高雄</MenuItem>
            <MenuItem value="屏東">屏東</MenuItem>
            <MenuItem value="台東">台東</MenuItem>
            <MenuItem value="蘭嶼">蘭嶼</MenuItem>
            <MenuItem value="澎湖">澎湖</MenuItem>
            <MenuItem value="金門">金門</MenuItem>
            <MenuItem value="連江">連江</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Date&Time picker"
            value={date}
            onChange={(newDate) => PickDate(newDate)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            height: 45,
            borderRadius: 3,
            bgcolor: "#D77047",
            color: "#FFFFFF",
            "&:hover": {
              bgcolor: "#DE8A68",
            },
          }}
          onClick={handleAdd}
        >
          {" "}
          Create Post{" "}
        </Button>
      </Grid>
    </Paper>
  );
}

export default Post;
