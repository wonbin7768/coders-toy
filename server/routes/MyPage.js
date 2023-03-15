import "./MyPage.css";
function MyPage() {
    const checkPW = () =>{
        
    }
  return (
    <div className="group_page">
      <div className="page_home type around">
        <div className="area_home type_top">
          <h2>Hi MyPage</h2>
        </div>
        <div className="type_timeline">
          <div className="area_loginpage">
            <div className="cont_login">
              <form>
                <div className="area_account">
                  <input className="cont_id_pw" placeholder="비밀번호" autoFocus />
                </div>
                <div className="area_btn">
                  <button onClick={()=>{checkPW()}} className="login_btn" type="submit">
                    비밀번호 확인
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyPage;
