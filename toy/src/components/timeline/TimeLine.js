import "./TimeLine.css";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
function TimeLine(props) {
  const [heart, setHeart] = useState("./img/heart.png");
  const [like, setLike] = useState({
    id: "",
    tl_seq: 0,
    tl_like: 0,
    plus: true,
  });
  const [img, setImg] = useState("");
  const id = useSelector((state) => state.page.stateReducer.id);
  useEffect(() => {
    //수정
    if (props.tl.like_id != null) {
      var like_id = props.tl.like_id.indexOf(id);
      if (like_id != -1) {
        setHeart("./img/redheart.png");
      }
    }
    setImg("http://localhost:4000/" + props.tl.tl_img);
  }, []);
  useEffect(() => {
    if (like.id !== "") {
      if (like.plus === true) {
        axios
          .post("http://localhost:4000/api/UpdateLike", { like })
          .then((res) => {
            console.log(res.data);
            //setComment(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post("http://localhost:4000/api/UpdateUnLike", { like })
          .then((res) => {
            console.log(res.data);
            //setComment(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [like]);
  const sendLike = () => {};
  const liked = (id, tl_seq, tl_like) => {
    //이 함수 안에 전역변수가 아닌 지역변수로 state 사용하면 바로 적용되나
    if (heart === "./img/heart.png") {
      setLike({ ...like, id: id, tl_seq: tl_seq, tl_like: tl_like + 1 });
      sendLike();
      setHeart("./img/redheart.png");
    } else {
      setLike({
        ...like,
        id: id,
        tl_seq: tl_seq,
        tl_like: tl_like - 1,
        plus: false,
      });
      sendLike();
      setHeart("./img/heart.png");
    }
  };
  const detailDate = (a) => {
    const milliSeconds = new Date() - a;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };
  return (
    <div className="area_home type_timeline">
      <div className="area_timeline type_header">
        {/* Header */}
        <div>
          <span className="area_timeline_profil">
            <img
              className="area_timeline_profil_img"
              src="img/user.png"
              draggable="false"
            />
          </span>
        </div>
        <div className="id">
          <span className="id_span">
            <a href="L">{props.tl.id}</a>
          </span>
        </div>
        <div className="post_dt">
          <div>{detailDate(new Date(props.tl.tl_dt))}</div>
        </div>
      </div>
      <div className="area_timeline type_body">
        {/* Body */}
        <div className="area_post_img">
          <img className="post_img" src={img} />
        </div>
        <div className="area_post_txt">
          <div className="post_txt">{props.tl.tl_content}</div>
        </div>
      </div>
      <div className="area_timeline type_footer">
        {/* Footer */}
        <div className="area_post_middlebar">
          <button
            className="like_btn"
            onClick={() => liked(id, props.tl.tl_seq, props.tl.tl_like)}
          >
            <img className="post_middlebar_img" src={heart}></img>
          </button>
          <button className="like_btn">
            <img className="post_middlebar_img" src="./img/dm.png"></img>
          </button>
        </div>
        <div className="area_post_likes">{props.tl.tl_like} Likes!!</div>
        <Comment tl_seq={props.tl.tl_seq} />
      </div>
    </div>
  );
}
export default TimeLine;
