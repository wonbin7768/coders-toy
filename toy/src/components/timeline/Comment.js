import "./TimeLine.css";
function Comment(props) {
  return (
    <div className="area_post_comment">
      <div className="wrap_comment">
        <div className="id comment_id">
          <span className="id_span">
            <a href="L">{props.cm.id}</a>
          </span>
        </div>
        <div className="post_comment">{props.cm.cm_content}</div>
      </div>
    </div>
  );
}
export default Comment;
