import { useEffect, useState } from "react";
import axios from "axios";
import "./SignUp.css";
import { pageHandler } from "../../features/statusSlice";
import { useDispatch } from "react-redux";

function SignUp() {
  const dispatch = useDispatch();
  const [idcheck, setIdcheck] = useState({
    id: "",
    check: false,
  });
  const [account, setAccount] = useState({
    id: "",
    pw: "",
    pwcf: "",
    name: "",
    phone: "",
  });
  const [validation, setValidation] = useState({
    idValidation: "",
    pwValidation: "",
    pwcfValidation: "",
    nameValidation: "",
    phoneValidation: "",
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
            pwValidation:
              "비밀번호는 영어,숫자,특수문자를 포함한 8~15자리로 만들어주세요.",
          });
        } else {
          setValidation({
            ...validation,
            pwValidation: "",
          });
          setAccount({ ...account, [e.target.name]: e.target.value });
        }
        break;
      case "pwcf":
        setAccount({ ...account, [e.target.name]: e.target.value });
        setValidation({
          ...validation,
          pwcfValidation: "",
        });
        break;
      case "name":
        if (!/^^[가-힣]{2,6}$/.test(e.target.value)) {
          setValidation({
            ...validation,
            nameValidation: "이름을 제대로 적어주세요.",
          });
        } else {
          setValidation({
            ...validation,
            nameValidation: "",
          });
          setAccount({ ...account, [e.target.name]: e.target.value });
        }
        break;
      case "phone":
        if (!/^^[0-9]{10,11}$/.test(e.target.value)) {
          setValidation({
            ...validation,
            phoneValidation: "핸드폰번호를 -없이 적고 다시 확인해주세요.",
          });
        } else {
          setValidation({
            ...validation,
            phoneValidation: "",
          });
          setAccount({ ...account, [e.target.name]: e.target.value });
        }
        break;
    }
  };
  const onChangeIdCheck = (e) => {
    if (!/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,16}$/.test(e.target.value)) {
      setValidation({
        ...validation,
        idValidation: "아이디는 영어와 숫자를 포함한 4~16자리로 만들어주세요.",
      });
    } else {
      setValidation({
        ...validation,
        idValidation: "",
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
      .then((res) => {
        if (res.data === true) {
          setAccount({ ...account, [e.target.name]: e.target.value });
          setIdcheck({ ...idcheck, check: true });
        } else if (res.data === false) {
          setIdcheck({ ...idcheck, check: false });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const pwCf = (e) => {
    if (e.target.value !== account.pw) {
      setValidation({ ...validation, pwcfValidation: "비밀번호가 다릅니다!" });
    }
  };
  const submitConditions = () => {
    if (
      account.id !== "" ||
      account.pw !== "" ||
      account.pwcf !== "" ||
      account.name !== "" ||
      account.phone !== "" ||
      validation.idValidation !== "" ||
      validation.pwValidation !== "" ||
      validation.pwcfValidation !== "" ||
      validation.phoneValidation !== "" ||
      validation.nameValidation !== "" ||
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
        if (response.data === "success") {
          console.log(response);
          alert("회원가입 성공! \n 로그인하세요 :)");
          dispatch(
            pageHandler({
              status:"LoginPage"
            })
          )
        }
      })
      .catch((error) => {
        console.log(error);
        alert("회원가입 실패!");
      });
  };
  const [img, setImg] = useState("img/reload.png");
  const swapImg = () => {
    if (idcheck.check === true && validation.idValidation === "") {
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
                <div>{validation.idValidation} </div>
                <div className="area_account">
                  <input
                    className="cont_id_pw"
                    type="password"
                    placeholder="비밀번호"
                    name="pw"
                    onChange={onChangeAccount}
                  />
                </div>
                <div>{validation.pwValidation} </div>
                <div className="area_account">
                  <input
                    className="cont_id_pw"
                    type="password"
                    placeholder="비밀번호 확인"
                    name="pwcf"
                    onBlur={(e) => {
                      pwCf(e);
                    }}
                    onChange={onChangeAccount}
                  />
                </div>
                <div>{validation.pwcfValidation} </div>
                <div className="area_account">
                  <input
                    className="cont_id_pw"
                    type="text"
                    placeholder="이름"
                    name="name"
                    onChange={onChangeAccount}
                  />
                </div>
                <div>{validation.nameValidation} </div>
                <div className="area_account">
                  <input
                    className="cont_id_pw"
                    type="text"
                    placeholder="전화번호"
                    name="phone"
                    onChange={onChangeAccount}
                  />
                </div>
                <div>{validation.phoneValidation} </div>
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
