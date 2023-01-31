import QuickLink from "../quicklink/QuickLink";
import TimeLine from "../timeline/TimeLine";
import "./MainPage.css";
function MainPage() {
  return (
    <div className="group_page">
      <div>
        <div className="page_home type_around">
          <h1 className="screen_out">홈</h1>
          <div className="area_home type_top">
            <strong className="welcome">
              "안녕하세요. ㅎㅇ"
              <br></br>
              "코더즈입니다. ㅎ ㅇ"
            </strong>
            <QuickLink/>
          </div>
            <TimeLine comment = "Hello comment!!"/>
        </div>
      </div>
      <div className="footer_page"></div>
    </div>
  );
}
export default MainPage;
