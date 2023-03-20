import { useEffect, useState } from "react";
import axios from "axios";
import "./InsertTimeLine.css";
import { pageHandler } from "../../features/statusSlice";
import { useDispatch } from "react-redux";
function InsertTimeLine() {
  const dispatch = useDispatch();
  const [idcheck, setIdcheck] = useState({
    id: "",
    check: false,
  });
  return (
    <div className="group_page">
      <div className="page_home type around">
        <div className="area_home type_top">
          <h2>Posting Page</h2>
        </div>
        <div className="type_timeline">
          <div className="area_postingPage">
            <form>
              <div className="posting_friend">
                <div className="posting_id">jolly7768</div>
                <div className="posting_id">jolly7768</div>
                <div className="posting_id">jolly7768</div>
              </div>
              <div className="posting_img">
                <input className="upload_name" value="첨부파일" placeholder="첨부파일"/>
                <label className="upload_img">
                  <img className="area_posting_img" src="./img/add.png" />
                </label>
                <input className="upload_img" type="file" />
              </div>
              <div className="posting_content"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InsertTimeLine;
