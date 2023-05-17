import "./MyPage.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ChangePw from "./ChangePw";
import ChangeRegion from "./ChangeRegion";
import ChangeProfilImg from "./ChangeProfilImg";
function InnerMyPage() {
  const [controll, setControll] = useState();
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
