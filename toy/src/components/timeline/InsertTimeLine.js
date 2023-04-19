import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./InsertTimeLine.css";
import { pageHandler } from "../../features/statusSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
function InsertTimeLine() {
  const navi = useNavigate();
  const ref = useRef();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.page.stateReducer.id);
  const [posting, setPosting] = useState({
    id: id,
    content: "",
    tag: "",
  });
  const [searchResult, setSearchResult] = useState([]);
  const [drawTag, setDrawTag] = useState([]);
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

    // console.log(img);
    // img.forEach((img) => {
    //   formData.append("file", img);
    // });
    for (let key of formData.keys()) {
      console.log(key);
    }
    /* value 확인하기 */
    for (let value of formData.values()) {
      console.log(value);
    }
  };
  let drawArr = {};
  const tag = (id, profilImg) => {
    let count = 0;
    drawArr = { id: id, profilImg: profilImg };
    if (drawTag.length === 0) {
      setDrawTag((arr) => [...arr, drawArr]);
    } else {
      for (let i = 0; i < drawTag.length; i++) {
        if (drawTag[i].id === drawArr.id) {
          count = +1;
          console.log(count);
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
    setDrawTag((arr) => {
      return arr.filter((current) => current.id !== id);
    });
  };
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
  const postContent = (content) => {
    setPosting({ ...posting, content: content.target.value });
    console.log(posting);
  };
  useEffect(() => {
    let tag = "";
    for (let i = 0; i < drawTag.length; i++) {
      if (tag === "") {
        tag = drawTag[i].id;
        setPosting({ ...posting, tag: tag });
      } else {
        tag = tag.concat(",", drawTag[i].id);
        setPosting({ ...posting, tag: tag });
      }
    }
    setPosting({ ...posting, tag: tag });
  }, [drawTag]);
  const goPosting = async (e) => {
    e.preventDefault();
    formData.append("file", imgRef.current.files[0]);
    formData.append("data", JSON.stringify(posting));
    // formData.append("tag", JSON.stringify(drawTag));
    axios
      .post("http://localhost:4000/api/insertTimeline", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        alert("Success Posting :)");
        dispatch(pageHandler({ status: "MainPage" ,login : true , id:id}));
        navi("/");
      })
      .catch((err) => {
        alert("Sorry Error :( ");
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
            <form encType="multipart/form-data">
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
              <div className="area_posting_tag">
                {drawTag &&
                  drawTag.map((item, index) => {
                    return (
                      <div
                        className="area_posting_following"
                        key={index}
                        onClick={() => {
                          deleteTag(item.id);
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
              <div className="area_posting_content">
                <textarea
                  className="posting_content"
                  placeholder="300자 내외로 적어주세요 :)"
                  onChange={(content) => {
                    postContent(content);
                  }}
                />
              </div>
              <div className="area_btn">
                <button
                  className="login_btn"
                  type="submit"
                  onClick={(e) => {
                    goPosting(e);
                  }}
                >
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
