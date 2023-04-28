import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { pageHandler } from "../../features/statusSlice";
import { useEffect, useState, useRef } from "react";
import useDetectClose from "../../hooks/useDetectClose";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import axios from "axios";
function NavBar(props) {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const dropDownRef = useRef(null);
  const statusBox = useSelector((state) => state.page.stateReducer);
  const id = useSelector((state) => state.page.stateReducer.id);
  var profilImg = "http://localhost:4000/" + statusBox.img;
  const [alertRead, setAlertRead] = useState("");
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
  const openModal = () => {
    if (alert.length === 0) {
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
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setAlertCount(0);
    setAlert([]);
    axios
      .post("http://localhost:4000/api/updateAlert", { alert })
      .then((res) => {})
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
  const mypage = (e) => {
    navi("/MyPage");
  };
  const insertTimeLine = (e) => {
    navi("/PostingPage");
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
            <Modal open={modalOpen} close={closeModal} header="Alert">
              {alert.map((item, index) => {
                if (item.tl_sender !== null) {
                  if (item.show_al === 1) {
                    return (
                      <div className="alert_div_read" key={index}>
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
                } else {
                  if (item.show_al === 1) {
                    return (
                      <div className="alert_div_read" key={index}>
                        {item.follower} 님이 팔로우 하셨습니다!
                      </div>
                    );
                  } else {
                    return (
                      <div className="alert_div" key={index}>
                        {item.follower} 님이 팔로우 하셨습니다!
                      </div>
                    );
                  }
                }
              })}
            </Modal>
          </div>
          <div className={loginVisible.cnameLogin}>
            <Link to="/Login" className="" name="undefined">
              Login
            </Link>
          </div>
          <div className={loginVisible.cnameMy}>
            <a
              className="area_navbar_profil_id"
              name="undefined"
              href="/testLogout"
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
                    로그아웃
                  </li>
                  <li
                    href="L"
                    onClick={(e) => {
                      insertTimeLine(e);
                    }}
                  >
                    글 작성
                  </li>
                  <li
                    href="L"
                    onClick={(e) => {
                      mypage(e);
                    }}
                  >
                    마이
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
                홈
              </a>
            </li>
            <li>질문</li>
            <li>프로젝트</li>
            <li>
              <a
                href="L"
                onClick={(e) => {
                  e.preventDefault();
                  mypage();
                }}
              >
                마이
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
export default NavBar;
