import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { USER_QUERY } from "../graphql/queries/user_query";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { set } from "date-fns";
import { usePost } from "./NewPost/hooks/usePost";

const Login = ({
  setUser,
  account,
  setAccount,
  password,
  setPassword,
  setLoggedIn,
}) => {
  const { setAccountHook } = usePost();
  const [showPassword, setShowPassword] = useState(false);
  const [accountDoesNotExist, setAccountDoesNotExist] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [accountInputEmpty, setAccountInputEmpty] = useState(false);
  const [passwordInputEmpty, setPasswordInputEmpty] = useState(false);

  
  const navigate = useNavigate();

  const { loading, error, data, refetch } = useQuery(USER_QUERY, {
    variables: {
      account: account,
      password: password,
    },
  });

  const handleLogin = async () => {
    // console.log("loading", loading);
    if (error) console.log(error);

    // check for empty input fields
    if (account === "") setAccountInputEmpty(true);
    else setAccountInputEmpty(false);

    if (password === "") setPasswordInputEmpty(true);
    else setPasswordInputEmpty(false);
    // console.log("login");
    //check if the account and password correct and exist
    const d = await refetch({
      variables: {
        account: account,
        password: password,
      },
    });
    // console.log(d.data);
    if (!d.data.checkUser) {
      //account doesn't exisit [add]
      // console.log("User does not exist");
      setAccountDoesNotExist(true);
      setIncorrectPassword(false);
    } else {
      setAccountDoesNotExist(false);
      //password correct
      if (d.data.checkUser.checked === true) {
        // console.log("user", d.data.checkUser.name);
        setUser(d.data.checkUser.name);
        setAccountHook(account)
        navigate("/");
        setLoggedIn(true);
        // setAccountHook(account);
      } else {
        //password wrong [add]
        // console.log("Wrong password");
        setIncorrectPassword(true);
      }
    }
  };

  return (
    <Grid>
      <Paper
        elevation={10}
        sx={{
          width: 370,
          height: 600,
          my: 10,
          mx: "auto",
          borderRadius: "7px",
          p: 2,
        }}
      >
        <Grid align="left" mb={10}>
          <Typography variant="h3" sx={{ fontWeight: 600 }}>
            ??????
          </Typography>
        </Grid>
        <TextField
          required
          fullWidth
          label="??????"
          placeholder="??????????????????"
          variant="standard"
          margin="normal"
          error={accountInputEmpty || accountDoesNotExist}
          helperText={
            accountInputEmpty
              ? "???????????????"
              : accountDoesNotExist
              ? "???????????????"
              : ""
          }
          onChange={(e) => {setAccount(e.target.value)}}
        />
        <TextField
          required
          fullWidth
          label="??????"
          placeholder="??????????????????"
          variant="standard"
          margin="normal"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={passwordInputEmpty || incorrectPassword}
          helperText={
            passwordInputEmpty
              ? "???????????????"
              : incorrectPassword
              ? "????????????"
              : ""
          }
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 5, mb: 0.5 }}
          onClick={handleLogin}
        >
          ??????
        </Button>
        <Typography variant="body2">
          ?????????????????????
          <Link href="/signup" sx={{ ml: 1 }}>
            ??????
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
