import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import QuickLink from "../quicklink/QuickLink";
import TimeLine from "../timeline/TimeLine";
import "./MainPage.css";
function MainPage() {
  const dispatch = useDispatch();
  const tlBox = useSelector((state) => state.page.timelineReducer);
  const [timeline, setTimeline] = useState([]);
  const [comment, setComment] = useState([]);
  const [sendCM, setSendCM] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:4000/api/timeline", {})
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
            <QuickLink />
          </div>
          {timeline.map((item,index) => (
            <TimeLine tl={item} key={index} />
          ))}
        </div>
      </div>
      <div className="footer_page"></div>
    </div>
  );
}
export default MainPage;
