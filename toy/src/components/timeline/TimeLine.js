import "./TimeLine.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
function TimeLine(props) {
  const dispatch = useDispatch();
  const statusBox = useSelector((state) => state.page.stateReducer);
  const [insertCM, setInsertCM] = useState({
    id: "",
    cm_content: "",
    tl_seq: "",
  });
  const [comment, setComment] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:4000/api/comment", {})
      .then((res) => {
        console.log(res.data);
        setComment(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setInsertCM({ ...insertCM, id: statusBox.id, tl_seq: props.tl.tl_seq });
  }, []);
  const onChange = (e) => {
    setInsertCM({
      ...insertCM,
      cm_content: e.target.value,
    });
  };
  const onClick = (e) => {
    axios
      .post("http://localhost:4000/api/insertCM", {
        insertCM,
      })
      .then((res) => {
        axios
          .post("http://localhost:4000/api/comment", {})
          .then((res) => {
            console.log(res.data);
            setComment(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        setInsertCM({ ...insertCM, cm_content: "" });
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  };
  return (
    <div className="area_home type_timeline">
      <div className="area_timeline type_header">
        {/* Header */}
        <div>
          <span className="area_timeline_profil">
            <img
              className="area_timeline_profil_img"
              src="img/user.png"
              draggable="false"
            />
          </span>
        </div>
        <div className="id">
          <span className="id_span">
            <a href="L">{props.tl.id}</a>
          </span>
        </div>
      </div>
      <div className="area_timeline type_body">
        {/* Body */}
        <div className="area_post_img">
          <img className="post_img" src={props.tl.tl_img} />
        </div>
        <div className="area_post_txt">
          <div className="post_txt">{props.tl.tl_content}</div>
        </div>
      </div>
      <div className="area_timeline type_footer">
        {/* Footer */}
        <div className="area_post_middlebar">
          <img className="post_middlebar_img" src="./img/heart.png"></img>
          <img className="post_middlebar_img" src="./img/dm.png"></img>
        </div>
        <div className="area_post_likes">{props.tl.tl_like} Likes!!</div>
        <div className="area_post_comment">
          {comment &&
            comment.map((item, index) => {
              if (item.tl_seq === props.tl.tl_seq) {
                return (
                  <div key={index} className="area_post_comment">
                    <div className="wrap_comment">
                      <div className="id comment_id">
                        <span className="id_span">
                          <a href="L">{item.id}</a>
                        </span>
                      </div>
                      <div className="post_comment">{item.cm_content}</div>
                    </div>
                  </div>
                );
              }
            })}
        </div>
        <div className="area_post_commentbox">
          <form>
            <input
              className="post_commentbox"
              name="comment"
              text="text"
              value={insertCM.cm_content}
              onChange={onChange}
              placeholder="댓글 달기... "
            ></input>
            <button
              type="submit"
              value={props.tl.tl_seq}
              onClick={onClick}
              className="post_commentbox_btn"
            >
              게시
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default TimeLine;
