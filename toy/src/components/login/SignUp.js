import { useEffect, useState } from "react";
import axios from "axios";
import "./SignUp.css";

function SignUp() {
  const [test, setTest] = useState(false);
  const [idcheck, setIdcheck] = useState({
    id: "",
    check: false,
  });
  const [account, setAccount] = useState({
    id: "",
    pw: "",
    name: "",
    phone: "",
  });

  const onChangeAccount = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };
  const onChangeIdCheck = (e) => {
    setIdcheck({ ...idcheck, [e.target.name]: e.target.value });
  };
  const idCheck = (e) => {
    axios
      .post("http://localhost:4000/api/idcheck", {
        idcheck,
      })
      .then((response) => {
        if (response.data === true) {
          setAccount({ ...account, [e.target.name]: e.target.value });
          setIdcheck({ ...idcheck, check: true });
        } else if (response.data === false) {
          setIdcheck({ ...idcheck, check: false });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickSignUp = () => {
    axios
      .post("http://localhost:4000/api", {
        account,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [img, setImg] = useState("img/reload.png");
  const swapImg = () => {
    if (idcheck.check === true) {
      setImg("img/o.png");
    } else {
      setImg("img/x.png");
    }
  };
  useEffect(() => {
    if (idcheck.id !== "") {
      swapImg();
    }
  }, [idcheck]);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="group_page">
      <div className="page_home type around">
        <div className="area_home type_top">
          <h2>Hi SignUp</h2>
        </div>
        <div className="type_timeline">
          <div className="area_loginpage">
            <div className="cont_login">
              <form onSubmit={handleSubmit}>
                <div className="area_account area_signup_id">
                  <input
                    className="cont_id_pw"
                    type="id"
                    placeholder="아이디"
                    name="id"
                    onChange={onChangeIdCheck}
                    onBlur={(e) => {
                      idCheck(e);
                    }}
                    autoFocus
                  />
                  <div className="cont_duplicate_idcheck">
                    <img className="cont_idcheck_img" src={img} />
                  </div>
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
                <div className="area_account">
                  <input
                    className="cont_id_pw"
                    type="text"
                    placeholder="이름"
                    name="name"
                    onChange={onChangeAccount}
                  />
                </div>
                <div className="area_account">
                  <input
                    className="cont_id_pw"
                    type="text"
                    placeholder="전화번호"
                    name="phone"
                    onChange={onChangeAccount}
                  />
                </div>
                <div className="area_btn">
                  <button
                    className="login_btn"
                    type="submit"
                    onClick={onClickSignUp}
                  >
                    회원가입
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
export default SignUp;
