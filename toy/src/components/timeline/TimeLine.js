import "./TimeLine.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function TimeLine(props) {
  const dispatch = useDispatch();
  const tlBox = useSelector((state) => state.page.timelineReducer);
  const [comment, setComment] = useState("");
  const [timeline, setTimeline] = useState([]);
  const onChange = (e) => {
    setComment(e.target.value);
  };
  const onClick = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    axios
      .post("http://localhost:4000/api/timeline", {})
      .then((res) => {
        // for (let i = 0; i < res.length; i++) {
        //   console.log(res.data[i]);
        // }
        console.log(res.data);
        setTimeline(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
          <div className="post_comment">{comment}</div>
          <div className="post_comment">{comment}</div>
          <div className="post_comment">{comment}</div>
          <div className="post_comment">{comment}</div>
          <div className="area_post_commentbox">
            <form>
              <input
                className="post_commentbox"
                name="comment"
                text="text"
                placeholder="댓글 달기... "
                onChange={onChange}
              ></input>
              <button
                type="submit"
                onClick={onClick}
                className="post_commentbox_btn"
              >
                게시
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TimeLine;
