import "./App.css";
import { useEffect, useState } from "react";
import NavBar from "./components/navbar/NavBar";
import MainPage from "./components/mainpage/MainPage";
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";
import { useSelector } from "react-redux";
import MyPage from "./components/mypage/MyPage";
import InsertTimeLine from "./components/timeline/InsertTimeLine";

function App(props) {
  const status = useSelector((state) => state.page.stateReducer.status);
  let content = null;
  switch (status) {
    case "MainPage":
      content = <MainPage />;
      break;
    case "LoginPage":
      content = <Login />;
      break;
    case "signupPage":
      content = <SignUp />;
      break;
    case "MyPage":
      content = <MyPage />;
      break;
    case "PostingPage":
      content = <InsertTimeLine />;
      break;
  }
  return (
      <div className="App">
        <NavBar />
        {content}
      </div>
  );
}

export default App;
