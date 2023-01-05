import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Home from "./components/MainPage/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Chat from "./components/Chat/Chat";
// import MyEvents from "./components/events/MyEvents";
import PreMain from "./components/PreMain";
import Post from "./components/NewPost/Post";
// <Route path="/" element={<Main account={account}/>} />
function App() {
  

  const [loggedIn, setLoggedIn] = useState(() => JSON.parse(localStorage.getItem('auth')) || false
  );
  const [myPost, setMyPost] = useState([]);
  //account info
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || "");
  const [account, setAccount] = useState(() => JSON.parse(localStorage.getItem('account')) || "");
  const [password, setPassword] = useState(() => JSON.parse(localStorage.getItem('pass')) || "");
  
  useEffect(()=>{
    localStorage.setItem("auth", JSON.stringify(loggedIn));
    localStorage.setItem("account", JSON.stringify(account));
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("pass", JSON.stringify(password));

  }, [loggedIn, user]);

  return loggedIn ? (
    <Router>
      <NavBar
        setLoggedIn={setLoggedIn}
        setAccount={setAccount}
        setPassword={setPassword}
      />
      <Routes>
        <Route
          path="/"
          element={<Home user={user} account={account} setMyPost={setMyPost} />}
        />
        {console.log(myPost)}
        <Route path="/newpost" element={<Post account={account} />} />
        <Route
          path="/chat"
          element={<Chat user={user} account={account} />}
        />
        {/* <Route path="/myevents" element={<MyEvents account={account} data={myPost}/>} /> */}
        <Route path="*" element={<h1>Error, Page Not Found</h1>} />
      </Routes>
    </Router>
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            <Login
              account={account}
              setAccount={setAccount}
              setUser = {setUser}
              password={password}
              setPassword={setPassword}
              setLoggedIn={setLoggedIn}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp
              
              setLoggedIn={setLoggedIn}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
