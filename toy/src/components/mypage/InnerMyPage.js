import "./MyPage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ChangePw from "./ChangePw";
import ChangeRegion from "./ChangeRegion";
import ChangeProfilImg from "./ChangeProfilImg";
function InnerMyPage() {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const [controll, setControll] = useState();
  const [account, setAccount] = useState({
    id: "",
    pw: "",
    pwcf: "",
    region: "",
  });
  const [validation, setValidation] = useState({
    idValidation: "",
    pwValidation: "",
    pwcfValidation: "",
  });
  const countRegion = account.region.split(",").length - 1;
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

      case "region":
        if (account.region == "") {
          setAccount({ ...account, region: e.target.value });
        } else if (
          countRegion < 4 &&
          account.region.indexOf(e.target.value) === -1
        ) {
          setAccount({
            ...account,
            region: account.region + "," + e.target.value,
          });
        }
        break;
    }
  };
  const submitConditions = () => {
    if (
      account.pw !== "" ||
      account.pwcf !== "" ||
    //   account.region !== "" ||
      validation.pwValidation !== "" ||
      validation.pwcfValidation !== ""
    ) {
      updateAccount();
    } else {
      alert("내용을 확인해주세요!");
    }
  };
  const updateAccount = () => {
  };
  const pwChange = () => {
    setControll(<ChangePw />);
  };
  const profilChange = () => {
    setControll(<ChangeProfilImg/>);
  };
  const regionChange = () => {
    setControll(<ChangeRegion />);
  };
  return (
    <div className="group_page">
      <div className="page_home type around">
        <div className="area_home type_top">
          <h2>Hi InnerMyPage</h2>
        </div>
        <div className="type_timeline">
          <div className="area_loginpage">
            <div className="cont_login">
              <div>
                <button onClick={profilChange} className="change_btn">
                  프로필 변경
                </button>
              </div>
              <div>
                <button onClick={pwChange} className="change_btn">
                  비밀번호 변경
                </button>
              </div>
              <div>
                <button onClick={regionChange} className="change_btn">
                  지역 변경
                </button>
              </div>
              
                {controll}
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function ChangePwt() {}

export default InnerMyPage;
