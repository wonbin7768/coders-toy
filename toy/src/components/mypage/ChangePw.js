import axios from "axios";
import "./MyPage.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
function ChangePw() {
  const navi = useNavigate();
  const id = useSelector((state) => state.page.stateReducer.id);
  const [account, setAccount] = useState({
    id: id,
    pw: "",
    pwcf: "",
    region: "",
    profilImg: "",
  });
  const [validation, setValidation] = useState({
    idValidation: "",
    pwValidation: "",
    pwcfValidation: "",
  });
  const pwCf = (e) => {
    if (e.target.value !== account.pw) {
      setValidation({ ...validation, pwcfValidation: "비밀번호가 다릅니다!" });
    }
  };
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
    }
  };
  const submitConditions = () => {
    if (
      account.pw !== "" &&
      account.pwcf !== "" &&
      validation.pwValidation === "" &&
      validation.pwcfValidation === ""
    ) {
      updateAccount();
    } else {
      alert("내용을 확인해주세요!");
    }
  };
  const updateAccount = () => {
    axios
      .post("http://localhost:4000/api/UpdateAccount", { account })
      .then((res) => {
        if (res !== false) {
          alert("비밀번호 변경 성공!");
        } else {
          alert("비밀번호 변경 실패 ㅠ");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form>
        <div className="area_account">
          <input
            className="cont_id_pw"
            type="password"
            placeholder="새 비밀번호"
            name="pw"
            onChange={onChangeAccount}
          />
        </div>
        <div>{validation.pwValidation} </div>
        <div className="area_account">
          <input
            className="cont_id_pw"
            type="password"
            placeholder="새 비밀번호 확인"
            name="pwcf"
            onBlur={(e) => {
              pwCf(e);
            }}
            onChange={onChangeAccount}
          />
        </div>
        <div>{validation.pwcfValidation} </div>
        <div className="area_btn">
          <button
            className="login_btn"
            type="submit"
            onClick={(e) => {
              submitConditions();
            }}
          >
            수정
          </button>
        </div>
      </form>
    </div>
  );
}
export default ChangePw;
