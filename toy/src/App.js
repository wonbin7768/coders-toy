import "./App.css";
import NavBar from "./components/navbar/NavBar";
import MainPage from "./components/mainpage/MainPage";
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";
import MyPage from "./components/mypage/MyPage";
import InnerMyPage from "./components/mypage/InnerMyPage";
import InsertTimeLine from "./components/timeline/InsertTimeLine";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilDetail from "./components/modals/ProfilDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUpPage" element={<SignUp />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/MyPage/InnerMyPage" element={<InnerMyPage />} />
          <Route path="/PostingPage" element={<InsertTimeLine />} />
          <Route path="/" element={<ProfilDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
