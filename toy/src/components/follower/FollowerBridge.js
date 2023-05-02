import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Follower from "./Follower";
function FollowerBridge() {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.page.stateReducer.id);
  const limit = 5;
  const [counting, setCounting] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timeline, setTimeline] = useState([]);
  const mapingTL = timeline.map((item, index) => (
    <Follower qt={item} key={index} />
  ));
  const pageHandle = () => {
    if (id !== "") {
      return mapingTL;
    }
  };
  const getData = (id, limit, offset) => {
    if (id === "") {
      navi("/Login");
    }
    return axios
      .post("http://localhost:4000/api/follower", { id, limit, offset })
      .then((res) => {
        console.log(res.data);
        if (res.data === false) {
          setLoading(true);
        } else {
          setTimeline((prevData) => [...prevData, ...res.data]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getMoreData = async () => {
    await getData(id, limit, offset);
    console.log(timeline);
    setLoading(false);
  };
  const infinityScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && loading === false) {
      setCounting((counting) => counting + 1);
    }
  };
  useEffect(() => {
    console.log(offset);
    setOffset((offset) => offset + limit);
    getMoreData();
  }, [counting]);
  useEffect(() => {
    window.addEventListener("scroll", infinityScroll);
    return () => {
      window.removeEventListener("scroll", infinityScroll);
    };
  }, []);
  return (
    <div className="group_page">
      <div>
        <div className="page_home type_around">
          <h1 className="screen_out">홈</h1>
          <div className="area_home type_top">
            <strong className="welcome">
              Hi Follower Tab
               
            </strong>
          </div>
          {pageHandle()}
        </div>
      </div>
      <div className="footer_page"></div>
    </div>
  );
}
export default FollowerBridge;