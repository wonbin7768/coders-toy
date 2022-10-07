import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { pageHandler } from "../../features/statusSlice";
//##
function Login() {
  const [account, setAccount] = useState({
    id: "",
    pw: "",
  });
  const onChangeAccount = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const onClickLogin = () => {
    if (account.id === "" || account.pw === "") {
    } else {
      dispatch(pageHandler({ status: account.id }, { pw: account.pw }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="group_page">
      <div className="page_home type around">
        <div className="area_home type_top">
          <h2>Hi </h2>
        </div>
        <div className="type_timeline">
          <div className="area_loginpage">
            <div className="cont_login">
              <form onSubmit={handleSubmit}>
                <div className="area_account">
                  <input
                    className="cont_id_pw"
                    type="id"
                    placeholder="아이디"
                    name="id"
                    onChange={onChangeAccount}
                    autoFocus
                  />
                </div>
                <div className="area_account">
                  <input
                    className="cont_id_pw"
                    type="password"
                    placeholder="비밀번호"
                    name="pw"
                    onChange={onChangeAccount}
                  />
                </div>
                <div className="area_btn">
                  <button
                    onClick={onClickLogin}
                    className="login_btn"
                    type="submit"
                  >
                    로그인
                  </button>
                </div>
              </form>
              <div className="area_info_user">
                <a
                  href="L"
                  className="link_join_user"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(pageHandler({ status: "signupPage" }));
                  }}
                >
                  회원가입
                </a>
                <ul className="list_info_user">
                  <li>
                    <a href="L" className="link_info_user">
                      계정 찾기
                    </a>
                  </li>
                  <li>
                    <a href="L" className="link_info_user">
                      비밀번호 찾기
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
