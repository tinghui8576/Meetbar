import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";
import { usePost } from "./NewPost/hooks/usePost";

// const StyledBottomNavigationAction = styled(BottomNavigationAction)(`
//   color: red;
// `);

function NavBar({ setLoggedIn, setAccount, setPassword }) {
  const { setAccountHook } = usePost();
  const [value, setValue] = useState(
    () => JSON.parse(localStorage.getItem("value")) || "posts"
  );
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("value", JSON.stringify(value));
  }, [value]);

  return (
    <>
      <BottomNavigation
        color="#F5F5F5"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ width: "100%", bgcolor: "#dfdfe2" }}
      >
        <BottomNavigationAction
          label="聊天室"
          value="chat"
          icon={<ChatIcon />}
          onClick={() => {
            navigate("/chat");
          }}
        />
        <BottomNavigationAction
          label="主頁"
          value="posts"
          icon={<HomeIcon />}
          onClick={() => {
            navigate("/");
          }}
        />
        <BottomNavigationAction
          label="Log out"
          value="logout"
          icon={<LogoutIcon />}
          onClick={() => {
            setAccount("");
            // setAccountHook("")
            setPassword("");
            setLoggedIn(false);
            localStorage.setItem("value", JSON.stringify(""));
          }}
        />
      </BottomNavigation>
    </>
  );
}

export default NavBar;
