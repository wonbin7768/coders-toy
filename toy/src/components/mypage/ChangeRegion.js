import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
function ChangeRegion() {
  const navi = useNavigate();
  const id = useSelector((state) => state.page.stateReducer.id);
  const region = [
    "서울",
    "인천",
    "부산",
    "대전",
    "대구",
    "울산",
    "광주",
    "제주",
    "세종",
    "경기",
    "강원",
    "충북",
    "충남",
    "경북",
    "경남",
    "전북",
    "전남",
  ];
  const [account, setAccount] = useState({
    id: id,
    pw: "",
    region: "",
    profilImg: "",
  });
  const countRegion = account.region.split(",").length - 1;
  const onChangeAccount = (e) => {
    switch (e.target.name) {
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
    if (account.region !== "") {
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
          alert("지역 변경 성공!");
        } else {
          alert("지역 변경 실패 ㅠ");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const clearRegion = () => {
    setAccount({ ...account, region: "" });
  };
  return (
    <div>
      <form>
        <div className="area_account">
          <select
            className="cont_region"
            name="region"
            onChange={onChangeAccount}
          >
            {region.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <h3>1~5가지 지역을 선택해주세요!</h3>
        </div>
        <div>
          <h3>{account.region}</h3>
          <button onClick={clearRegion} className="region_clear_btn">
            지역 다시 고르기
          </button>
        </div>
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
export default ChangeRegion;
