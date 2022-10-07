import "./NavBar.css";
import Login from "../login/Login";
import App from "../../App";
import { useDispatch } from "react-redux";
import { pageHandler } from "../../features/statusSlice";
function NavBar(props) {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="app_bar">
        <strong className="logo">
          <a className="link_logo" href="L">
            Coders
          </a>
        </strong>
        <div className="app_bar_login">
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
      </div>
      <header className="nav_bar">
        <nav>
          <ul className="list_nav">
            <li>
              <a className="link_list_nav" href="L">
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
