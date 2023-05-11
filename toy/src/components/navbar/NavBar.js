import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { pageHandler } from "../../features/statusSlice";
import { useEffect, useState, useRef } from "react";
import useDetectClose from "../../hooks/useDetectClose";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios";
import ProfilDetail from "../modals/ProfilDetail";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
function NavBar(props) {
  const scrollRef = useRef();
  const navi = useNavigate();
  const dispatch = useDispatch();
  const dropDownRef = useRef(null);
  const [chatHandle, setChatHandle] = useState(false);
  const statusBox = useSelector((state) => state.page.stateReducer);
  const id = useSelector((state) => state.page.stateReducer.id);
  var profilImg = "http://localhost:4000/" + statusBox.img;
  const [profilDetail, setProfilDetail] = useState();
  const [loginVisible, setLoginVisible] = useState({
    id: "",
    login: false,
    cnameLogin: "visible_loginbox",
    cnameMy: "invisible_mybox",
  });
  const [alertCount, setAlertCount] = useState(0);
  const [alert, setAlert] = useState([]);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
  const [modalOpen, setModalOpen] = useState(false);
  const [dmOpen, setDmOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageRoom, setMessageRoom] = useState([]);
  const [pushMessage, setPushMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  const loadMessages = (id) => {
    setDmOpen(true);
    console.log(id);
    axios
      .post("http://localhost:5000/api/loadMessageRoom", { id })
      .then((res) => {
        if (res.data !== false) {
          setMessageRoom(res.data);
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
  const closeDM = () => {
    setDmOpen(false);
    setChatHandle(false);
    setMessageRoom([]);
  };

  const openModal = () => {
    setModalOpen(true);
    if (alert.length === 0 && id !== "") {
      axios
        .post("http://localhost:4000/api/Alert", { id })
        .then((res) => {
          if (res.data !== false && res.data !== alert) {
            for (var i = 0; i < res.data.length; i++) {
              if (res.data[i].show_al === 0) {
                increaseCount();
              }
            }
            setAlert((prevData) => [...prevData, ...res.data]);

            console.log(alert);
          } else {
            console.log("알림이 없습니다");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const closeModal = () => {
    setModalOpen(false);
    setAlertCount(0);
    axios
      .post("http://localhost:4000/api/updateAlert", { alert })
      .then((res) => {
        setAlert([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const increaseCount = () => {
    setAlertCount((alertCount) => alertCount + 1);
  };
  useEffect(() => {
    if (id !== "") {
      axios
        .post("http://localhost:4000/api/Alert", { id })
        .then((res) => {
          if (res.data !== false && res.data !== alert) {
            for (var i = 0; i < res.data.length; i++) {
              if (res.data[i].show_al === 0) {
                increaseCount();
              }
            }
            setAlert((prevData) => [...prevData, ...res.data]);
          } else {
            console.log("알림이 없습니다");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  useEffect(() => {
    console.log(profilImg);
    if (statusBox.login === true) {
      setLoginVisible({
        ...loginVisible,
        id: statusBox.id,
        login: statusBox.login,
        cnameLogin: "invisible_loginbox",
        cnameMy: "visible_mybox",
      });
    }
  }, [statusBox.login]);
  const testLogout = () => {
    setAlert([]);
    setAlertCount(0);
    setLoginVisible({
      ...loginVisible,
      id: "",
      login: false,
      cnameLogin: "visible_loginbox",
      cnameMy: "invisible_mybox",
    });
  };
  useEffect(() => {
    dispatch(
      pageHandler({
        login: loginVisible.login,
        id: loginVisible.id,
        img: statusBox.img,
      })
    );
  }, [loginVisible.login]);
  const mypage = () => {
    navi("/MyPage");
  };
  const insertTimeLine = () => {
    navi("/PostingPage");
  };
  const openProfilDetail = (id) => {
    closeModal();
    setProfilDetail(<ProfilDetail id={id} />);
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
  useEffect(() => {
    scrollBottom();
  }, [messages]);
  const scrollBottom = () => {
    scrollRef.current?.scrollIntoView({});
  };
  const onChangeMessage = (e) => {
    setPushMessage(e.target.value);
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
    <div>
      <div className="app_bar">
        <strong className="logo">
          <Link className="link_logo" to="/">
            Coders
          </Link>
        </strong>
        <div className="app_bar_login">
          <div className="alert_wrap">
            <img
              onClick={openModal}
              className="alert_img"
              src="http://localhost:4000/bell.png"
            ></img>
            <div className="alert_count">{alertCount}</div>
            <img
              onClick={() => {
                navi("/SearchFollower");
              }}
              className="search_img"
              src="http://localhost:4000/search.png"
            ></img>
            <img
              onClick={() => {
                loadMessages(id);
              }}
              className="alert_dm"
              src="http://localhost:4000/dm.png"
            ></img>
            {profilDetail}
            <Modal open={modalOpen} close={closeModal} header="Alert">
              {alert.map((item, index) => {
                if (item.tl_sender !== null) {
                  if (item.show_al === 1) {
                    return (
                      <div
                        onClick={() => {}}
                        className="alert_div_read"
                        key={index}
                      >
                        {item.tl_sender} 님이 태그 하셨습니다!
                      </div>
                    );
                  } else {
                    return (
                      <div className="alert_div" key={index}>
                        {item.tl_sender} 님이 태그 하셨습니다!
                      </div>
                    );
                  }
                } else if (item.follower !== null) {
                  if (item.show_al === 1) {
                    return (
                      <div
                        onClick={() => {
                          openProfilDetail(item.follower);
                        }}
                        className="alert_div_read"
                        key={index}
                      >
                        {item.follower} 님이 팔로우 하셨습니다!
                      </div>
                    );
                  } else {
                    return (
                      <div
                        onClick={() => {
                          openProfilDetail(item.follower);
                        }}
                        className="alert_div"
                        key={index}
                      >
                        {item.follower} 님이 팔로우 하셨습니다!
                      </div>
                    );
                  }
                } else if (item.qt_sender !== null) {
                  if (item.show_al === 1) {
                    return (
                      <div className="alert_div_read" key={index}>
                        {item.qt_sender} 님이 질문 하셨습니다!
                      </div>
                    );
                  } else {
                    return (
                      <div className="alert_div" key={index}>
                        {item.qt_sender} 님이 질문 하셨습니다!
                      </div>
                    );
                  }
                }
              })}
            </Modal>
          </div>
          <Modal
            id="modal"
            open={dmOpen}
            close={closeDM}
            header="Direct Message"
          >
            {chatHandle !== true ? (
              <div>
                <div>Chat Room</div>
                {messageRoom.map((item, index) => (
                  <div
                    onClick={() => {
                      chatDetail(item.sender, item.receiver);
                    }}
                    className="chat_room_div"
                    key={index}
                  >
                    <div className="chat_room_div_profil">
                      {item.sender === id ? item.receiver : item.sender}{" "}
                    </div>
                    <div className="chat_room_div_recentMessage">
                      {" "}
                      {item.sender} : {item.message}{" "}
                    </div>
                    <div className="chat_room_div_dt">
                      {detailDate(new Date(item.ct_dt))}
                    </div>
                  </div>
                ))}
              </div>
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
                            <div className="receiver_message">
                              {item.message}
                            </div>
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
                      loadMessages(id);
                    }}
                  >
                    Go Chat Room
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
          <div className={loginVisible.cnameLogin}>
            <Link to="/Login" className="" name="undefined">
              Login
            </Link>
          </div>
          <div className={loginVisible.cnameMy}>
            <a
              className="area_navbar_profil_id"
              name="undefined"
              href="L"
              onClick={(e) => {
                e.preventDefault();
                if (loginVisible.id !== "") {
                  setIsOpen(!isOpen);
                }
              }}
            >
              <div>
                <span className="area_timeline_profil area_navbar_profil">
                  <img
                    className="area_timeline_profil_img"
                    src={profilImg}
                    draggable="false"
                  />
                </span>
              </div>
              <div>
                {loginVisible.id}
                <ul
                  ref={dropDownRef}
                  className={`${
                    loginVisible.id === ""
                      ? "area_navbar_dropdown_debug "
                      : "area_navbar_dropdown "
                  } ${isOpen ? "active" : "inactive"}`}
                >
                  <li
                    onClick={() => {
                      if (isOpen) {
                        testLogout();
                      }
                    }}
                  >
                    Logout
                  </li>
                  <li
                    onClick={() => {
                      insertTimeLine();
                    }}
                  >
                    Posting
                  </li>
                  <li
                    onClick={() => {
                      openProfilDetail(id);
                    }}
                  >
                    Profil
                  </li>
                </ul>
              </div>
            </a>
          </div>
        </div>
      </div>
      <header className="nav_bar">
        <nav>
          <ul className="list_nav">
            <li>
              <a
                className="link_list_nav"
                href="L"
                onClick={(e) => {
                  e.preventDefault();
                  navi("/");
                }}
              >
                Region
              </a>
            </li>
            <li
              onClick={() => {
                navi("/Follower");
              }}
            >
              Follower
            </li>
            <li
              onClick={() => {
                navi("/QuestionPage");
              }}
            >
              Question
            </li>
            <li>
              <a
                href="L"
                onClick={(e) => {
                  e.preventDefault();
                  mypage();
                }}
              >
                My
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
export default NavBar;
