import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Question from "./Question";
function QuestionBridge() {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const [searchCG, setSearchCG] = useState("");
  const category = [
    "java",
    "c++",
    "c#",
    "javaScript",
    "react",
    "typescript",
    "python",
    "node js",
    "flutter",
    "jango",
    "flask",
    "spring",
    "mysql",
    "oracle",
  ];
  const id = useSelector((state) => state.page.stateReducer.id);
  const limit = 5;
  const [counting, setCounting] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timeline, setTimeline] = useState([]);
  const mapingTL = timeline.map((item, index) => (
    <Question qt={item} key={index} />
  ));
  const pageHandle = () => {
    if (id !== "") {
      return mapingTL;
    }
  };
  const getData = (id, limit, offset, searchCG) => {
    if (id === "") {
      navi("/Login");
    }
    return axios
      .post("http://localhost:4000/api/question", {
        id,
        limit,
        offset,
        searchCG,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === false) {
          setLoading(true);
        } else {
          setTimeline((prevData) => {
            const prevSEQ = prevData.map((item) => item.qt_seq);
            const filteredData = res.data.filter(
              (item) => !prevSEQ.includes(item.qt_seq)
            );
            return [...prevData, ...filteredData];
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getMoreData = async () => {
    await getData(id, limit, offset, searchCG);
    console.log(timeline);
    setLoading(false);
  };
  const infinityScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight && loading === false) {
      setCounting((counting) => counting + 1);
    }
  };
  useEffect(() => {
    console.log(offset);
    setOffset((offset) => offset + limit);
    getMoreData();
  }, [counting]);
  useEffect(() => {
    window.addEventListener("scroll", infinityScroll);
    return () => {
      window.removeEventListener("scroll", infinityScroll);
    };
  }, []);
  const selectcategory = (e) => {
    setSearchCG(e.target.value);
    setOffset(0);
    setTimeline([]);
    getData(id, limit, 0, e.target.value);
  };

  return (
    <div className="group_page">
      <div>
        <div className="page_home type_around">
          <h1 className="screen_out">홈</h1>
          <div className="area_home type_top">
            <strong className="welcome">Question Tab</strong>
            <form>
              <div>
                <div className="area_account">
                  <select
                    className="cont_region"
                    name="category"
                    onChange={(e) => {
                      selectcategory(e);
                    }}
                  >
                    {category.map((item, index) => {
                      return (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <h3>검색할 기술을 선택해주세요!</h3>
                </div>
                <div>
                  <h3>{searchCG}</h3>
                </div>
              </div>
            </form>
          </div>
          {pageHandle()}
        </div>
      </div>
      <div className="footer_page"></div>
    </div>
  );
}
export default QuestionBridge;
