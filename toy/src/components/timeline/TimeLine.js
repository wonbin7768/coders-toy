import "./TimeLine.css";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ProfilDetail from "../modals/ProfilDetail";
import { useNavigate } from "react-router";
function TimeLine(props) {
  const [heart, setHeart] = useState("./img/heart.png");
  const type = "tl";
  const [like, setLike] = useState({
    id: "",
    tl_seq: 0,
    tl_like: 0,
    plus: null,
  });
  const [propsLike, setPropsLike] = useState();
  const [img, setImg] = useState("");
  const [modalContent, setModalContent] = useState();
  const id = useSelector((state) => state.page.stateReducer.id);
  const tl_seq = props.tl.tl_seq;
  const profilImg = "http://localhost:4000/" + props.tl.profilImg;
  useEffect(() => {
    axios
      .post("http://localhost:4000/api/timelinelike", { id, tl_seq, type })
      .then((res) => {
        if (res.data !== false) {
          if (props.tl.tl_seq === res.data[0].tl_seq) {
            setHeart("./img/redheart.png");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setPropsLike(props.tl.tl_like);
    setLike({
      ...like,
      id: id,
      tl_seq: tl_seq,
      tl_like: props.tl.tl_like,
      plus: true,
    });
    setImg("http://localhost:4000/" + props.tl.tl_img);
  }, []);
  useEffect(() => {
    if (like.id !== "") {
      if (like.plus === true) {
        axios
          .post("http://localhost:4000/api/UpdateLike", { like, type })
          .then((res) => {
            setPropsLike(res.data[0].tl_like);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post("http://localhost:4000/api/UpdateUnLike", { like, type })
          .then((res) => {
            setPropsLike(res.data[0].tl_like);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [heart]);
  const liked = (id, tl_seq, tl_like) => {
    if (heart === "./img/heart.png") {
      if (like.tl_like !== tl_like) {
        setLike({
          ...like,
          id: id,
          tl_seq: tl_seq,
          tl_like: tl_like,
          plus: true,
        });
      } else {
        setLike({
          ...like,
          id: id,
          tl_seq: tl_seq,
          tl_like: tl_like + 1,
          plus: true,
        });
      }

      setHeart("./img/redheart.png");
    } else {
      if (like.tl_like !== tl_like) {
        setLike({
          ...like,
          id: id,
          tl_seq: tl_seq,
          tl_like: tl_like,
          plus: false,
        });
      } else {
        setLike({
          ...like,
          id: id,
          tl_seq: tl_seq,
          tl_like: tl_like - 1,
          plus: false,
        });
      }

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
  const openDetail = (id) => {
    setModalContent(<ProfilDetail id={id} />);
  };
  return (
    <div className="area_home type_timeline">
      <div className="area_timeline type_header">
        {/* Header */}
        <div>
          <div className="tl_profil_modal_wrap">
            <span className="area_timeline_profil">
              <img
                onClick={() => {
                  openDetail(props.tl.id);
                }}
                className="area_timeline_profil_img"
                src={profilImg}
                draggable="false"
              />
            </span>
            <div className="id">
              <span className="id_span">
                <a
                  onClick={() => {
                    openDetail(props.tl.id);
                  }}
                >
                  {props.tl.id}
                </a>
              </span>
            </div>
            {modalContent}
          </div>
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
        <div className="area_post_likes">{propsLike} Likes!!</div>
        <Comment type="tl" tl_seq={props.tl.tl_seq} />
      </div>
    </div>
  );
}
export default TimeLine;
