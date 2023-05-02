
import Comment from "../timeline/Comment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Modal from "../navbar/Modal";
function Follower(props) {
  const [heart, setHeart] = useState("./img/heart.png");
  const [hover, setHover] = useState(false);
  const [profil, setProfil] = useState({
    id: "",
    name: "",
    region: "",
    profilImg: "",
    follower: 0,
    following: 0,
  });
  const [followM, setFollowM] = useState("");
  const [profilTL, setProfilTL] = useState([]);
  let [loading, setLoading] = useState(false);
  const [propsLike, setPropsLike] = useState();
  const [img, setImg] = useState("http://localhost:4000/"+props.qt.qt_img);
  const id = useSelector((state) => state.page.stateReducer.id);
  const loginID = useSelector((state) => state.page.stateReducer.id);
  const qt_seq = props.qt.qt_seq;
  const profilImg = "http://localhost:4000/" + props.qt.profilImg;
  const [modalOpen, setModalOpen] = useState(false);
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
  const openModal = (id) => {
    console.log(profil);
    axios
      .post("http://localhost:4000/api/profil", { id, loginID })
      .then((res) => {
        setProfil(res.data[0]);
        if (profil.fCheck === 0) {
          setFollowM("팔로우");
        } else {
          setFollowM("언팔");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setModalOpen(true);
    setLoading(true);
    setTimeout(() => {
      axios
        .post("http://localhost:4000/api/profilTimeline", { id })
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          setProfilTL((prevData) => [...prevData, ...res.data]);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }, 500);
  };
  const drawContent = (index) => {
    return <div className="hover_div">{profilTL[index].tl_content}</div>;
  };
  const drawProfilTL = () => {
    if (profilTL.length === 0) {
      return <div>게시글이 없습니다</div>;
    }
    return profilTL.map((item, index) => (
      <div
        onMouseEnter={() => {
          setHover(true);
          drawContent(index)
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        onClick={() => {}}
        className="profil_tl_box"
        key={index}
      >
        <div className="profil_tl_img_box">
          {hover !== true ? (
            <img
              className="profil_tl_img"
              src={"http://localhost:4000/" + item.tl_img}
            />
          ) : (
            drawContent(index)
          )}
        </div>
      </div>
    ));
  };
  const closeModal = () => {  
    setModalOpen(false);
  };
  const follow = (id, bool) => {
    axios
      .post("http://localhost:4000/api/updateFollow", { id, loginID, bool })
      .then((res) => {
        if (res.data === true) {
          if (profil.fCheck === 0) {
            setProfil({ ...profil, fCheck: 1});
            console.log(profil.fCheck);
            setFollowM("언팔");
          } else {
            setProfil({ ...profil, fCheck: 0 });
            console.log(profil.fCheck);
            setFollowM("팔로우");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
                  openModal(props.qt.id);
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
                    openModal(props.qt.id);
                  }}
                >
                  {props.qt.id}
                </a>
              </span>
            </div>
            <Modal open={modalOpen} close={closeModal} header="Profil">
              <div className="area_timeline type_header profil_header">
                <span className="area_timeline_profil modal_profil">
                  <img
                    className="area_timeline_profil_img"
                    src={"http://localhost:4000/" + profil.profilImg}
                    draggable="false"
                  />
                </span>
                <div className="id profil_id modal_profil">
                  <span className="id_span">
                    <a>{profil.id}</a>
                  </span>
                </div>
                <div className="follow_div">
                  {loginID !== profil.id ? (
                    <button
                      className="follow_btn"
                      onClick={() => {
                        follow(profil.id, profil.fCheck);
                      }}
                    >
                      {/* {profil.fCheck === 0 ? m1 : m2} */}
                      {followM}
                    </button>
                  ) : null}
                </div>
                <div className="profil_followBox">
                  <span className="profil_follower">
                    <div className="follow_counting"> {profil.follower}</div>
                    Follower
                  </span>
                  <span className="profil_following">
                    <div className="follow_counting"> {profil.following}</div>
                    Following
                  </span>
                </div>
              </div>
              <div className="profil_body">
                {loading === true ? (
                  <div>게시글 로딩중...</div>
                ) : (
                  drawProfilTL()
                )}
              </div>
            </Modal>
          </div>
        </div>
        <div className="post_dt">
          <div>{detailDate(new Date(props.qt.qt_dt))}</div>
        </div>
      </div>
      <div className="area_timeline type_body">
        {/* Body */}
        <div className="area_post_img">
          <img className="post_img" src={img} />
        </div>
        <div className="area_post_txt">
          <div className="post_txt">{props.qt.qt_content}</div>
        </div>
      </div>
      <div className="area_timeline type_footer">
        {/* Footer */}
        <div className="area_post_middlebar">
          <button
            className="like_btn"
           >
            <img className="post_middlebar_img" src={heart}></img>
          </button>
          <button className="like_btn">
            <img className="post_middlebar_img" src="./img/dm.png"></img>
          </button>
        </div>
        <Comment type="qt" qt_seq={props.qt.qt_seq} />
      </div>
    </div>
  );
}
export default Follower;
