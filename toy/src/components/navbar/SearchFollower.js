import "./NavBar.css";
import { useSelector } from "react-redux";
import {useState } from "react";
import axios from "axios";
import ProfilDetail from "../modals/ProfilDetail";
function SearchFollower() {
  const [searchResult, setSearchResult] = useState([]);
  const id = useSelector((state) => state.page.stateReducer.id);
  const [drawTag, setDrawTag] = useState([]);
  const [profilDetail, setProfilDetail] = useState();
  const serachFollower = (e) => {
    const fw = e.target.value;
    axios
      .post("http://localhost:4000/api/searchPeople", {
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
  return (
    <>
      <div className="group_page">
        <div className="page_home type around">
          <div className="area_home type_top">
            <h2>Search Follower</h2>
            <form>
              <div className="area_follow_wrap">
                <div className="area_posting_follow_search">
                  <input
                    className="posting_follow_search"
                    placeholder="Id or Name"
                    onChange={(e) => {
                      serachFollower(e);
                    }}
                  />
                </div>
                {profilDetail}
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
                            onClick={() => {
                              setProfilDetail(<ProfilDetail id={id} />);
                            }}
                            className="area_timeline_profil_img"
                            src={"http://localhost:4000/" + item.profilImg}
                            draggable="false"
                          />
                        </span>
                        <div
                          onClick={() => {
                            setProfilDetail(<ProfilDetail id={item.id} />);
                          }}
                          className="posting_follow"
                        >
                          {item.id}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </form>
          </div>
        </div>
        <div />
      </div>
    </>
  );
}
export default SearchFollower;
