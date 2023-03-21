import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./InsertTimeLine.css";
import { pageHandler } from "../../features/statusSlice";
import { useDispatch } from "react-redux";
function InsertTimeLine() {
  const dispatch = useDispatch();
  const [posting, setPosting] = useState({
    id: "",
    img: "./img/add.png",
  });
  const [preImg, setPreImg] = useState("posting_img");
  const imgRef = useRef();
  const saveImg = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPosting({ ...posting, img: reader.result });
      setPreImg("preview_img");
    };
  };
  return (
    <div className="group_page">
      <div className="page_home type around">
        <div className="area_home type_top">
          <h2>Posting Page</h2>
        </div>
        <div className="type_timeline">
          <div className="area_postingPage">
            <form>
              <div className="area_posting_friend_wrap">
                <div className="area_posting_friend">
                  <span className="area_timeline_profil area_posting_profil">
                    <img
                      className="area_timeline_profil_img"
                      src="img/user.png"
                      draggable="false"
                    />
                  </span>
                  <div className="posting_friend">jolly7768</div>
                </div>
                <div className="area_posting_friend">
                  <span className="area_timeline_profil area_posting_profil">
                    <img
                      className="area_timeline_profil_img"
                      src="img/user.png"
                      draggable="false"
                    />
                  </span>
                  <div className="posting_friend">jolly7768</div>
                </div>
             
              </div>
              <div className="area_posting_img">
                <label
                  className="upload_img_label"
                  htmlFor="postingImg"
                ></label>
                <img className={preImg} src={posting.img} />
                <input
                  className="upload_img"
                  type="file"
                  accept="image/*"
                  id="postingImg"
                  onChange={saveImg}
                  ref={imgRef}
                />
              </div>
              <div className="area_posting_content">
                <textarea
                  className="posting_content"
                  placeholder="300자 내외로 적어주세요 :)"
                />
              </div>
              <div className="area_btn">
                <button className="login_btn" type="submit">
                  Posting
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InsertTimeLine;
