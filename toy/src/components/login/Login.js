import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { pageHandler } from "../../features/statusSlice";
import { useNavigate } from "react-router-dom";
function Login() {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const [account, setAccount] = useState({
    id: "",
    pw: "",
  });
  const onChangeAccount = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };
  const onClickLogin = () => {
    if (account.id === "" || account.pw === "") {
      alert("아이디 비밀번호를 입력하세요!");
    } else {
      axios
        .post("http://localhost:4000/api/login", {
          account,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data !== false) {
            var profilImg = res.data[0].profilImg;
            console.log(profilImg);

            dispatch(
              pageHandler({
                login: true,
                id: account.id,
                img: profilImg,
              })
            );
            alert("로그인성공!");
            navi("/");
          } else {
            alert("아이디 비밀번호를 확인하세요");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="group_page">
      <div className="page_home type around">
        <div className="area_home type_top">
          <h2>Hi Login</h2>
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
                    navi("/SignUpPage");
                  }}
                >
                  회원가입
                </a>
                <ul className="list_info_user">
                  <li>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        navi("/SignUpPage");
                      }}
                      href="L"
                      className="link_info_user"
                    >
                      아이디 찾기
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        navi("/SignUpPage");
                      }}
                      href="L"
                      className="link_info_user"
                    >
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
