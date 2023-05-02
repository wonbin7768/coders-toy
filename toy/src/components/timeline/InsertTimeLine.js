import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./InsertTimeLine.css";
import { pageHandler } from "../../features/statusSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
function InsertTimeLine() {
  const navi = useNavigate();
  const ref = useRef();
  const catagory = ["java", "c++", "c#", "javaScript"];
  const dispatch = useDispatch();
  const id = useSelector((state) => state.page.stateReducer.id);
  const [pageControll, setPageControll] = useState("timeline");
  const [posting, setPosting] = useState({
    id: id,
    content: "",
    tag: "",
    catagory: "",
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
    console.log(e);
    formData.append("file", imgRef.current.files[0]);
    formData.append("data", JSON.stringify(posting));
    formData.append("type", e);
    // formData.append("tag", JSON.stringify(drawTag));
    axios
      .post("http://localhost:4000/api/insertTimeline", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        alert("Success Posting :)");
        navi("/");
      })
      .catch((err) => {
        alert("Sorry Error :( ");
      });
  };
  const countCatagory = posting.catagory.split(",").length - 1;
  const selectCatagory = (e) => {
    if (posting.catagory == "") {
      setPosting({ ...posting, catagory: e.target.value });
    } else if (
      countCatagory < 4 &&
      posting.catagory.indexOf(e.target.value) === -1
    ) {
      setPosting({
        ...posting,
        catagory: posting.catagory + "," + e.target.value,
      });
    }
  };
  const page = (e) => {
    if (pageControll === "timeline") {
      return;
    } else {
      return (
        <div>
          <div className="area_account">
            <select
              className="cont_region"
              name="catagory"
              onChange={(e) => {
                selectCatagory(e);
              }}
            >
              {catagory.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <h3>1~5가지 기술을 선택해주세요!</h3>
          </div>
          <div>
            <h3>{posting.catagory}</h3>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="group_page">
      <div className="page_home type around">
        <div className="area_home type_top">
          <h2>Posting Page</h2>
          <h4>Chose Type</h4>
          <div className="area_btn_insertTL">
            <button
              className="login_btn_insertTL"
              onClick={(e) => {
                setPageControll("timeline");
              }}
            >
              Timeline
            </button>
            <button
              className="login_btn_insertTL"
              onClick={(e) => {
                setPageControll("question");
              }}
            >
              Question
            </button>
          </div>
        </div>
        <div className="type_timeline ">
          <div className="area_postingPage">
            <form encType="multipart/form-data">
              {page()}
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
                            src={"http://localhost:4000/" + item.profilImg}
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
                            src={"http://localhost:4000/" + item.profilImg}
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
                  className={"login_btn " + (pageControll === "question" ? pageControll:null)}
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    goPosting("tl");
                  }}
                >
                  Posting Timeline
                </button>
                <button
                  className={"login_btn " + (pageControll === "timeline" ? pageControll:null)}
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    goPosting("qt");
                  }}
                >
                  Posting Question
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
