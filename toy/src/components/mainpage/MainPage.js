import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import QuickLink from "../quicklink/QuickLink";
import MyPage from "../mypage/MyPage";
import TimeLine from "../timeline/TimeLine";
import "./MainPage.css";
import InsertTimeLine from "../timeline/InsertTimeLine";
function MainPage() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.page.stateReducer.status);
  const id = useSelector((state)=> state.page.stateReducer.id);
  const [timeline, setTimeline] = useState([]);
  const [comment, setComment] = useState([]);
  let content = null;
  switch (status) {
    case "MainPage":  
      content = <QuickLink />;
      break;
    case "MyPage":
      content = <MyPage />;
      break;
    case "PostingPage":
      content = <InsertTimeLine />;
      break;
  }
  const mapingTL = timeline.map((item, index) => (
    <TimeLine tl={item} key={index} />
  ))
  const pageHandle = () => {
    if(status === "MainPage" && id !== "" ){
      return mapingTL;
    }
  }
  useEffect(() => {
    axios
      .post("http://localhost:4000/api/timeline", {id})
      .then((res) => {
        console.log(res.data);
        setTimeline(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(comment);
  }, []);
  return (
    <div className="group_page">
      <div>
        <div className="page_home type_around">
          <h1 className="screen_out">홈</h1>
          <div className="area_home type_top">
            <strong className="welcome">
              안녕하세요. ㅎㅇ"
              <br></br>
              "코더즈입니다. ㅎ ㅇ"
            </strong>
            {content}
          </div>
          {pageHandle()}
        </div>
      </div>
      <div className="footer_page"></div>
    </div>
  );
}
export default MainPage;
