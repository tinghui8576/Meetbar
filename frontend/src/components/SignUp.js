import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import { USER_QUERY } from "../graphql/queries/user_query";
import { CREATE_USER_MUTATION } from "../graphql/create_user";
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

// 輸入要有字數限制，不能為空字串或是符號

const SignUp = ({ setLoggedIn }) => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [checkuser, { loading, error, data, subscribeToMore }] =
    useLazyQuery(USER_QUERY);
  //account info
  const [username, setUsername] = useState("");
  const [confirm, setConfirm] = useState("");

  //check for invalid input
  const [accountInputEmpty, setAccountInputEmpty] = useState(false);
  const [usernameInputEmpty, setUsernameInputEmpty] = useState(false);
  const [passwordInputEmpty, setPasswordInputEmpty] = useState(false);
  const [confirmInputEmpty, setConfirmInputEmpty] = useState(false);
  const [accountAlreadyExists, setAccountAlreadyExists] = useState(false);
  const [confirmIncorrect, setConfirmIncorrect] = useState(false);

  //create new user mutation (back)
  const [createuser] = useMutation(CREATE_USER_MUTATION);

  const handleSingUp = async () => {
    let flag = false;

    const d = await checkuser({
      variables: {
        account: account,
        password: password,
      },
    });
    // console.log(d.data.checkUser);
    if (d.data.checkUser) {
      setAccountAlreadyExists(true);
      flag = true;
    } else setAccountAlreadyExists(false);
    if (account === "") {
      setAccountInputEmpty(true);
      flag = true;
    } else setAccountInputEmpty(false);

    if (username === "") {
      setUsernameInputEmpty(true);
      flag = true;
    } else setUsernameInputEmpty(false);

    if (password === "") {
      setPasswordInputEmpty(true);
      flag = true;
    } else setPasswordInputEmpty(false);

    if (confirm === "") {
      setConfirmInputEmpty(true);
      flag = true;
    } else setConfirmInputEmpty(false);

    if (password !== confirm) {
      setConfirmIncorrect(true);
      flag = true;
    }

    // handleSignUp
    if (!flag) {
      createuser({
        variables: {
          input: {
            name: username,
            account: account,
            password: password,
          },
        },
      });
      //navigate to main page
      navigate("/");
    }
  };

  return (
    <>
      <Grid>
        <Paper
          elevation={10}
          sx={{
            width: 370,
            height: "fit-contnet",
            minHeight: 600,
            my: 10,
            mx: "auto",
            borderRadius: "7px",
            p: 2,
          }}
        >
          <Grid align="left" mb={3}>
            <Typography variant="h3" sx={{ fontWeight: 600, mb: 1 }}>
              註冊
            </Typography>
            <Typography variant="body1">
              請填寫下方資訊以完成註冊
            </Typography>
          </Grid>
          <TextField
            required
            fullWidth
            label="帳號"
            placeholder="輸入您的帳號"
            variant="standard"
            margin="normal"
            error={accountInputEmpty || accountAlreadyExists}
            helperText={
              accountInputEmpty
                ? "請輸入帳號"
                : accountAlreadyExists
                ? "帳號已存在"
                : ""
            }
            onChange={(e) => setAccount(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label="暱稱"
            placeholder="輸入您的暱稱"
            variant="standard"
            margin="normal"
            error={usernameInputEmpty}
            helperText={usernameInputEmpty ? "請輸入暱稱" : ""}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label="密碼"
            placeholder="輸入您的密碼"
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
            error={passwordInputEmpty}
            helperText={passwordInputEmpty ? "請輸入密碼" : ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label="確認密碼"
            placeholder="重新輸入密碼"
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
            error={confirmInputEmpty || confirmIncorrect}
            helperText={
              confirmInputEmpty
                ? "請重新輸入密碼"
                : confirmIncorrect
                ? "密碼不相符"
                : ""
            }
            onChange={(e) => setConfirm(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 5, mb: 0.5 }}
            onClick={handleSingUp}
          >
            註冊
          </Button>
          <Button onClick={() => navigate("login")}>回到登入</Button>
        </Paper>
      </Grid>
    </>
  );
};

export default SignUp;
