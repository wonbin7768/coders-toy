import axios from "axios";
import "./MyPage.css";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
function ChangeProfilImg() {
  const navi = useNavigate();
  const id = useSelector((state) => state.page.stateReducer.id);
  const [account, setAccount] = useState({
    id: id,
    pw: "",
    region: "",
    profilImg: "",
  });
  const [preImgArea, setpreImgArea] = useState("posting_img");
  const [preImg, setPreImg] = useState("http://localhost:4000/add.png");
  const [img, setImg] = useState([]);
  const imgRef = useRef();
  const formData = new FormData();
  const saveImg = (e) => {
    e.preventDefault();
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setpreImgArea("preview_img");
      setPreImg(reader.result);
    };
    console.log(e.target.files[0]);
    setImg([...img, file]);
    for (let key of formData.keys()) {
      console.log(key);
    }
    /* value 확인하기 */
    for (let value of formData.values()) {
      console.log(value);
    }
  };
  useEffect(() => {
    console.log(img);
  }, [img]);
  const submitConditions = () => {
    if (img.length !== 0) {
      goPosting();
    } else {
      alert("내용을 확인해주세요!");
    }
  };
  const goPosting = async (e) => {
    formData.append("file", imgRef.current.files[0]);
    formData.append("id",JSON.stringify(id));
    axios
      .post("http://localhost:4000/api/UpdateAccount", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        alert("Success Posting :)");
      })
      .catch((err) => {
        alert("Sorry Error :( ");
      });
  };
  return (
    <div>
      <form encType="multipart/form-data">
        <div className="area_posting_img">
          <label
            className="upload_img_label"
            htmlFor="postingImg"
            name="file"
          ></label>
          <img className={preImgArea} src={preImg} />
          <input
            className="upload_img"
            name="file"
            type="file"
            accept="image/jpg,image/png,image/jpeg,image/gif,"
            id="postingImg"
            onChange={(e) => {
              saveImg(e);
            }}
            ref={imgRef}
          />
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
export default ChangeProfilImg;
