import "./QuickLink.css";
function QuickLink(){
    return(
        <div className="group_quicklink">
        <h3 className="screen_out">퀵링크</h3>
        <div className="item_quick">
          <a className="link_quick" draggable="false" href="L">
            <img
              src="img/muscle.png"
              className="img_quick"
              draggable="false"
            />
            <span className="txt_quick">코더뉴스</span>
          </a>
        </div>
        <div className="item_quick">
          <a className="link_quick" draggable="false" href="L">
            <img
              src="img/muscle.png"
              className="img_quick"
              draggable="false"

            />
            <span className="txt_quick">스터디</span>
          </a>
        </div>
        <div className="item_quick">
          <a className="link_quick" draggable="false" href="L">
            <img
              src="img/muscle.png"
              className="img_quick"
              draggable="false"

            />
            <span className="txt_quick">추천</span>
          </a>
        </div>
        <div className="item_quick">
          <a className="link_quick" draggable="false" href="L">
            <img
              src="img/muscle.png"
              className="img_quick"
              draggable="false"

            />
            <span className="txt_quick">쇼츠</span>
          </a>
        </div>
      </div>
    );
}
export default QuickLink;