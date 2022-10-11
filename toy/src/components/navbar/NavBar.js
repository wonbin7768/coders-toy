import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { pageHandler } from "../../features/statusSlice";
import { useEffect, useState } from "react";
function NavBar(props) {
  const dispatch = useDispatch();
  const statusBox = useSelector((state) => state.page.stateReducer);
  const [loginVisible, setLoginVisible] = useState({
    id: "",
    login: false,
    cnameLogin: "visible_loginbox",
    cnameMy: "invisible_mybox",
  });
  useEffect(() => {
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
        status: "MainPage",
        login: loginVisible.login,
        id: loginVisible.id,
      })
    );
  }, [loginVisible.login]);
  return (
    <div>
      <div className="app_bar">
        <strong className="logo">
          <a
            className="link_logo"
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                pageHandler({
                  status: "MainPage",
                  login: loginVisible.login,
                  id: loginVisible.id,
                })
              );
            }}
            href="L"
          >
            Coders
          </a>
        </strong>
        <div className="app_bar_login">
          <div className={loginVisible.cnameLogin}>
            <a
              className=""
              name="undefined"
              href="/Login"
              onClick={(e) => {
                e.preventDefault();
                dispatch(pageHandler({ status: "LoginPage" }));
              }}
            >
              Login
            </a>
          </div>
          <div className={loginVisible.cnameMy}>
            <a
              className="area_navbar_profil_id"
              name="undefined"
              href="/testLogout"
              onClick={(e) => {
                e.preventDefault();
                testLogout();
              }}
            >
              <div>
                <span className="area_timeline_profil area_navbar_profil">
                  <img
                    className="area_timeline_profil_img"
                    src="img/user.png"
                    draggable="false"
                  />
                </span>
              </div>
              <div>{loginVisible.id}</div>
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
                  dispatch(
                    pageHandler({
                      status: "MainPage",
                      login: loginVisible.login,
                      id: loginVisible.id,
                    })
                  );
                }}
              >
                홈
              </a>
            </li>
            <li>내주변</li>
            <li>질문</li>
            <li>프로젝트</li>
            <li>마이</li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
export default NavBar;
