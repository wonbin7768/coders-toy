import { useNavigate } from "react-router";
import "./QuickLink.css";
function QuickLink(){
  const navi = useNavigate();
    return(
        <div className="group_quicklink">
        <h3 className="screen_out">퀵링크</h3>
        <div className="item_quick">
          <a onClick={(e)=>{e.preventDefault(); navi("/")}} className="link_quick" draggable="false" href="L">
            <img
              src="http://localhost:4000/region.png"
              className="img_quick"
              draggable="false"
            />
            <span className="txt_quick">Region</span>
          </a>
        </div>
        <div className="item_quick">
          <a onClick={(e)=>{e.preventDefault(); navi("/Follower")}} className="link_quick" draggable="false" href="L">
            <img
              src="http://localhost:4000/follow.png"
              className="img_quick"
              draggable="false"

            />
            <span className="txt_quick">Follower</span>
          </a>
        </div>
        <div className="item_quick">
          <a onClick={(e)=>{e.preventDefault(); navi("/QuestionPage")}} className="link_quick" draggable="false" href="L">
            <img
              src="http://localhost:4000/question.png"
              className="img_quick"
              draggable="false"

            />
            <span className="txt_quick">Question</span>
          </a>
        </div>
        <div className="item_quick">
          <a onClick={(e)=>{e.preventDefault(); navi("/MyPage")}} className="link_quick" draggable="false" href="L">
            <img
              src="http://localhost:4000/my.png"
              className="img_quick"
              draggable="false"

            />
            <span className="txt_quick">My</span>
          </a>
        </div>
      </div>
    );
}
export default QuickLink;