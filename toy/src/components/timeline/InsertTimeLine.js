import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./InsertTimeLine.css";
import { pageHandler } from "../../features/statusSlice";
import { useDispatch, useSelector } from "react-redux";
function InsertTimeLine() {
  const ref = useRef();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.page.stateReducer.id);
  const [posting, setPosting] = useState({
    id: "",
    img: "./img/add.png",
  });
  const [searchResult, setSearchResult] = useState([]);
  const [drawTag, setDrawTag] = useState([]);
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
  let drawArr = {};
  const tag = (id, profilImg) => {
    let count = 0;
    drawArr = { id: id, profilImg: profilImg };
    if (drawTag.length === 0) {
      setDrawTag((arr) => [...arr, drawArr]);
      console.log("first");
    } else {
      for (let i = 0; i < drawTag.length; i++) {
        if (drawTag[i].id === drawArr.id) {
          count = +1;
          return count;
        }
      }
      if (count === 0) {
        setDrawTag((arr) => [...arr, drawArr]);
        count = 0;
      }
    }
  };
  const deleteTag = (id) => {
    setDrawTag((arr) =>{
      return arr.filter((current => current.id !== id ))
    });
  }
  const serachFollower = (e) => {
    const fw = e.target.value;
    axios
      .post("http://localhost:4000/api/searchFollower", {
        id,
        fw,
      })
      .then((res) => {
        setSearchResult(res.data);
        console.log(searchResult);
      })
      .catch((err) => {
        console.log(err);
      });
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
              <div className="area_posting_follow_wrap">
                <div className="area_posting_follow_search">
                  <input
                    className="posting_follow_search"
                    placeholder="Id or Name"
                    onChange={(e) => {
                      serachFollower(e);
                    }}
                  />
                </div>
                {searchResult &&
                  searchResult.map((item, index) => {
                    return (
                      <div
                        className="area_posting_follow"
                        key={index}
                        onClick={() => {
                          tag(item.id, item.profilImg);
                        }}
                      >
                        <span className="area_timeline_profil area_posting_profil">
                          <img
                            className="area_timeline_profil_img"
                            src={item.profilImg}
                            draggable="false"
                          />
                        </span>
                        <div className="posting_follow">{item.id}</div>
                      </div>
                    );
                  })}
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
              <div className="area_posting_tag">
                {drawTag &&
                  drawTag
                    .map((item, index) => {
                      return (
                        <div
                          className="area_posting_following"
                          key={index}
                          onClick={() => {deleteTag(item.id)}}
                        >
                          <span className="area_timeline_profil area_posting_profil">
                            <img
                              className="area_timeline_profil_img"
                              src={item.profilImg}
                              draggable="false"
                            />
                          </span>
                          <div className="posting_follow">{item.id}</div>
                        </div>
                      );
                    })}
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
