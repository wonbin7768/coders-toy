import "./MyPage.css";
import axios from "axios";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pageHandler } from "../../features/statusSlice";
function MyPage() {
  const dispatch = useDispatch();
  const [account, setAccount] = useState({
    id: "",
    pw: "",
  });
  const id = useSelector((state) => state.page.stateReducer.id);
  const onChangePW = (e) => {
    setAccount({ ...account, id: id, pw: e.target.value });
  };
  const checkPW = () => {
    if (account.pw === "") {
      alert("비밀번호를 입력하세요!");
    } else {
      axios
        .post("http://localhost:4000/api/login", {
          account,
        })
        .then((res) => {
          if (res.data === true) {
            dispatch(
              pageHandler({
                status: "MyPage",
                login: true,
                id: account.id,
              })
            );
          } else {
            alert("비밀번호를 확인하세요");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="group_page">
      <div className="page_home type around">
        <div className="area_home type_top">
          <h2>Hi MyPage</h2>
        </div>
        <div className="type_timeline">
          <div className="area_loginpage">
            <div className="cont_login">
              <form>
                <div className="area_account">
                  <input
                    onChange={onChangePW}
                    className="cont_id_pw"
                    placeholder="비밀번호"
                    type="password"
                    autoFocus
                  />
                </div>
                <div className="area_btn">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      checkPW();
                    }}
                    className="login_btn"
                    type="submit"
                  >
                    비밀번호 확인
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyPage;
