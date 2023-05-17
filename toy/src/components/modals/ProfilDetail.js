import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Modal from "../navbar/Modal";
import io from "socket.io-client";
import "../navbar/NavBar.css";
const socket = io.connect("http://localhost:5000");
function ProfilDetail(props) {
  const [hover, setHover] = useState(-1);
  const [profil, setProfil] = useState({
    id: "",
    name: "",
    region: "",
    profilImg: "",
    follower: 0,
    following: 0,
  });
  const id = useSelector((state) => state.page.stateReducer.id);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [pushMessage, setPushMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  const [chatHandle, setChatHandle] = useState(false);
  const [profilTL, setProfilTL] = useState([]);
  let [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [followM, setFollowM] = useState("");
  const loginID = useSelector((state) => state.page.stateReducer.id);
  useEffect(() => {
    if (props.id !== "") {
      openModal(props.id);
    }
  }, [props.fc]);
  const openModal = (id) => {
    axios
      .post("http://localhost:4000/api/profil", { id, loginID })
      .then((res) => {
        setProfil(res.data[0]);
        if (res.data[0].fCheck === 0) {
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
          if (res.data !== false) {
            setProfilTL((prevData) => [...prevData, ...res.data]);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }, 500);
  };
  const deletePost = (i) => {
    if (profilTL[i].tl_seq === null) {
      var seq = profilTL[i].qt_seq;
      var type = "qt";
    } else {
      var seq = profilTL[i].tl_seq;
      var type = "tl";
    }
    axios
      .post("http://localhost:4000/api/deleteTL", { seq, type, loginID })
      .then((res) => {
        setProfilTL([]);
        setProfilTL((prevData) => [...prevData, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const drawContent = (index) => {
    if (profilTL[index].tl_seq === null) {
      return <div className="hover_div">{profilTL[index].qt_content}</div>;
    } else {
      return <div className="hover_div">{profilTL[index].tl_content}</div>;
    }
  };
  const drawImg = (index) => {
    if (profilTL[index].tl_seq === null) {
      return (
        <img
          className="profil_tl_img"
          src={"http://localhost:4000/" + profilTL[index].qt_img}
        />
      );
    } else {
      return (
        <img
          className="profil_tl_img"
          src={"http://localhost:4000/" + profilTL[index].tl_img}
        />
      );
    }
  };

  const drawProfilTL = () => {
    if (profilTL.length === 0) {
      return <div>게시글이 없습니다</div>;
    }
    return profilTL.map((item, index) => (
      <div
        onMouseEnter={() => {
          setHover(index);
        }}
        onMouseLeave={() => {
          setHover(-1);
        }}
        onClick={() => {}}
        className="profil_tl_box"
        key={index}
      >
        <div className="profil_tl_img_box">
          {hover === -1 ? drawImg(index) : drawContent(index)}
        </div>
        {loginID === item.id ? (
          <div>
            <button
              onClick={() => {
                deletePost(index);
              }}
              className="detail_btn"
            >
              삭제
            </button>
          </div>
        ) : null}
      </div>
    ));
  };
  const closeModal = () => {
    setModalOpen(false);
    setChatHandle(false);
    setProfilTL([]);
  };
  const follow = (id, bool) => {
    axios
      .post("http://localhost:4000/api/updateFollow", { id, loginID, bool })
      .then((res) => {
        if (res.data === true) {
          if (profil.fCheck === 0) {
            setProfil({ ...profil, fCheck: 1 });
            console.log(profil.fCheck);
            setFollowM("팔로우");
          } else {
            setProfil({ ...profil, fCheck: 0 });
            console.log(profil.fCheck);
            setFollowM("언팔");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sendMessage = (message) => {
    const sender = id;
    socket.emit("message", { sender, receiver, message }, (err) => {
      alert(err);
    });
    setPushMessage("");
    return () => {
      socket.off("message");
    };
  };
  useEffect(() => {
    scrollBottom();
  }, [messages]);
  const scrollBottom = () => {
    scrollRef.current?.scrollIntoView({});
  };
  const onChangeMessage = (e) => {
    setPushMessage(e.target.value);
  };
  const chatDetail = (sender, receiver) => {
    if (sender === id) {
      setReceiver(receiver);
    } else {
      setReceiver(sender);
    }
    setChatHandle(true);
    socket.emit("loadMessages", { sender, receiver });
    socket.on("loadMessages", (rows) => {
      setMessages([]);
      setMessages((prevData) => [...prevData, ...rows]);
    });
    return () => {
      socket.off("loadMessages");
    };
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
    <Modal open={modalOpen} close={closeModal} header="Profil">
      {chatHandle !== true ? (
        <>
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
            <div className="wrap_follow_div">
              <div className="follow_div">
                {loginID !== profil.id ? (
                  <button
                    className="follow_btn"
                    onClick={() => {
                      follow(profil.id, profil.fCheck);
                    }}
                  >
                    {followM}
                  </button>
                ) : null}
              </div>
              <div className="follow_div">
                {loginID !== profil.id ? (
                  <button
                    className="follow_btn"
                    onClick={() => {
                      setChatHandle(true);
                      chatDetail(id, profil.id);
                    }}
                  >
                    DM
                  </button>
                ) : null}
              </div>
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
            {loading === true ? <div>게시글 로딩중...</div> : drawProfilTL()}
          </div>
        </>
      ) : (
        <div className="chatRoom_div">
          <div onClick={() => {}}>
            {messages.map((item, index) => (
              <div key={index}>
                <div className="area_sender">
                  {item.sender === id ? null : (
                    <div className="chat_sender">{item.sender}</div>
                  )}
                </div>
                <div className="area_message_div">
                  <div className="message_div">
                    {item.sender === id ? (
                      <div className="my_message">{item.message}</div>
                    ) : (
                      <div className="receiver_message">{item.message}</div>
                    )}
                  </div>
                  {item.sender === id ? (
                    <div id="me" className="my_message_dt">
                      {detailDate(new Date(item.ct_dt))}
                    </div>
                  ) : (
                    <div id="me" className="receiver_message_dt">
                      {" "}
                      {detailDate(new Date(item.ct_dt))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="div_flex">
            <div
              className="go_chat_room"
              onClick={() => {
                setChatHandle(false);
              }}
            >
              Go to Profil
            </div>
            <div ref={scrollRef} className="send_message_div">
              <form>
                <input
                  value={pushMessage}
                  onChange={(e) => {
                    onChangeMessage(e);
                  }}
                  className="message_box"
                  type="text"
                ></input>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    sendMessage(pushMessage);
                  }}
                  className="send_message_btn"
                >
                  전송
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
export default ProfilDetail;
