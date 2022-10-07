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
  const [validation, setValidation] = useState({
    idvalidation: "",
    pwvalidation: "",
    namevalidation: "",
    phonevalidation: "",
  });
  const onChangeAccount = (e) => {
    switch (e.target.name) {
      case "pw":
        if (
          !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/.test(
            e.target.value
          )
        ) {
          setValidation({
            ...validation,
            pwvalidation:
              "비밀번호는 영어,숫자,특수문자를 포함한 8~15자리로 만들어주세요.",
          });
        } else {
          setValidation({
            ...validation,
            pwvalidation: "",
          });
          setAccount({ ...account, [e.target.name]: e.target.value });
        }
        break;
      case "name":
        if (!/^^[가-힣]{2,6}$/.test(e.target.value)) {
          setValidation({
            ...validation,
            namevalidation: "이름을 제대로 적어주세요.",
          });
        } else {
          setValidation({
            ...validation,
            namevalidation: "",
          });
          setAccount({ ...account, [e.target.name]: e.target.value });
        }
        break;
      case "phone":
        if (!/^^[0-9]{10,11}$/.test(e.target.value)) {
          setValidation({
            ...validation,
            phonevalidation: "핸드폰번호를 -없이 적고 다시 확인해주세요.",
          });
        } else {
          setValidation({
            ...validation,
            phonevalidation: "",
          });
          setAccount({ ...account, [e.target.name]: e.target.value });
        }
        break;
    }
  };
  const pixAccount = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };
  const onChangeIdCheck = (e) => {
    if (!/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,16}$/.test(e.target.value)) {
      setValidation({
        ...validation,
        idvalidation: "아이디는 영어와 숫자를 포함한 4~16자리로 만들어주세요.",
      });
    } else {
      setValidation({
        ...validation,
        idvalidation: "",
      });
      setAccount({ ...account, [e.target.name]: e.target.value });
      setIdcheck({ ...idcheck, [e.target.name]: e.target.value });
    }
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
  const submitConditions = () => {
    if (
      account.id !== "" ||
      account.pw !== "" ||
      account.name !== "" ||
      account.phone !== "" ||
      validation.idvalidation !== "" ||
      validation.pwvalidation !== "" ||
      validation.phonevalidation !== "" ||
      validation.namevalidation !== "" ||
      idcheck.check !== false
    ) {
      onClickSignUp();
    } else {
      alert("내용을 확인해주세요!");
    }
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
    if (idcheck.check === true && validation.idvalidation === "") {
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
                <div>{validation.idvalidation} </div>
                <div className="area_account">
                  <input
                    className="cont_id_pw"
                    type="password"
                    placeholder="비밀번호"
                    name="pw"
                    onChange={onChangeAccount}
                  />
                </div>
                <div>{validation.pwvalidation} </div>
                <div className="area_account">
                  <input
                    className="cont_id_pw"
                    type="text"
                    placeholder="이름"
                    name="name"
                    onChange={onChangeAccount}
                  />
                </div>
                <div>{validation.namevalidation} </div>
                <div className="area_account">
                  <input
                    className="cont_id_pw"
                    type="text"
                    placeholder="전화번호"
                    name="phone"
                    onChange={onChangeAccount}
                  />
                </div>
                <div>{validation.phonevalidation} </div>
                <div className="area_btn">
                  <button
                    className="login_btn"
                    type="submit"
                    onClick={submitConditions}
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
