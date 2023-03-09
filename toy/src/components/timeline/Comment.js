import "./TimeLine.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { commentHandler } from "../../features/commentSlice";
function Comment(props) {
  const dispatch = useDispatch();
  const seq = useRef();
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
        dispatch(commentHandler(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
    setInsertCM({ ...insertCM, id: statusBox.id, tl_seq: props.tl_seq });
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
        setComment(res.data);
        setInsertCM({ ...insertCM, cm_content: "" });
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  };
  const detailDate = (a) => {
    const milliSeconds = new Date() - a;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };
  const showX = (id) => {
    if (id === insertCM.id) {
      return <img className="delete_img" src="./img/delete.png"></img>;
    }
  };
  const deleteCM = (cm_seq) => {
    console.log(cm_seq);
    axios
      .post("http://localhost:4000/api/deleteCM", { cm_seq })
      .then((res) => {
        setComment(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="area_post_comment">
        {comment &&
          comment.map((item, index) => {
            if (item.tl_seq === props.tl_seq) {
              return (
                <div key={index} className="area_post_comment">
                  <div className="wrap_comment">
                    <div className="id comment_id">
                      <span className="id_span">
                        <a href="L">{item.id}</a>
                      </span>
                    </div>
                    <div className="post_comment">{item.cm_content}</div>
                    <div className="post_comment_delete">
                      <button
                        className="delete_btn"
                        onClick={() => deleteCM(item.cm_seq)}
                      >
                        {showX(item.id)}
                      </button>
                    </div>
                    <div className="post_comment_dt">
                      <div className="comment_dt">{detailDate(new Date(item.cm_dt))}</div>
                    </div>
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
            value={props.tl_seq}
            onClick={onClick}
            className="post_commentbox_btn"
          >
            게시
          </button>
        </form>
      </div>
    </>
  );
}
export default Comment;
