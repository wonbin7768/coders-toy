import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "../navbar/Modal";
import { useLocation } from "react-router";
function ProfilDetail(props) {
  const [hover, setHover] = useState(false);
  const [profil, setProfil] = useState({
    id: "",
    name: "",
    region: "",
    profilImg: "",
    follower: 0,
    following: 0,
  });
  const [profilTL, setProfilTL] = useState([]);
  let [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [followM, setFollowM] = useState("");
  const loginID = useSelector((state) => state.page.stateReducer.id);
  const state = useLocation();
  useEffect(() => {
    console.log(props.id);
    if (props.id) {
      openModal(props.id);
    }
  }, [props.id]);
  const openModal = (id) => {
    axios
      .post("http://localhost:4000/api/profil", { id, loginID })
      .then((res) => {
        setProfil(res.data[0]);
        if (profil.fCheck === 0) {
          setFollowM("팔로우");
        } else {
          setFollowM("언팔");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setModalOpen(true);
    setLoading(true);
    setTimeout(() => {
      axios
        .post("http://localhost:4000/api/profilTimeline", { id })
        .then((res) => {
          setLoading(false);
          console.log(res.data);
          setProfilTL((prevData) => [...prevData, ...res.data]);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }, 500);
  };

  const drawContent = (index) => {
    return <div className="hover_div">{profilTL[index].tl_content}</div>;
  };
  const drawProfilTL = () => {
    if (profilTL.length === 0) {
      return <div>게시글이 없습니다</div>;
    }
    return profilTL.map((item, index) => (
      <div
        onMouseEnter={() => {
          setHover(true);
          drawContent(index);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        onClick={() => {}}
        className="profil_tl_box"
        key={index}
      >
        <div className="profil_tl_img_box">
          {hover !== true ? (
            <img
              className="profil_tl_img"
              src={"http://localhost:4000/" + item.tl_img}
            />
          ) : (
            drawContent(index)
          )}
        </div>
      </div>
    ));
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const follow = (id, bool) => {
    axios
      .post("http://localhost:4000/api/updateFollow", { id, loginID, bool })
      .then((res) => {
        if (res.data === true) {
          if (profil.fCheck === 0) {
            setProfil({ ...profil, fCheck: 1 });
            console.log(profil.fCheck);
            setFollowM("언팔");
          } else {
            setProfil({ ...profil, fCheck: 0 });
            console.log(profil.fCheck);
            setFollowM("팔로우");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Modal open={modalOpen} close={closeModal} header="Profil">
      <div className="area_timeline type_header profil_header">
        <span className="area_timeline_profil modal_profil">
          <img
            className="area_timeline_profil_img"
            src={"http://localhost:4000/" + profil.profilImg}
            draggable="false"
          />
        </span>
        <div className="id profil_id modal_profil">
          <span className="id_span">
            <a>{profil.id}</a>
          </span>
        </div>
        <div className="follow_div">
          {loginID !== profil.id ? (
            <button
              className="follow_btn"
              onClick={() => {
                follow(profil.id, profil.fCheck);
              }}
            >
              {/* {profil.fCheck === 0 ? m1 : m2} */}
              {followM}
            </button>
          ) : null}
        </div>
        <div className="profil_followBox">
          <span className="profil_follower">
            <div className="follow_counting"> {profil.follower}</div>
            Follower
          </span>
          <span className="profil_following">
            <div className="follow_counting"> {profil.following}</div>
            Following
          </span>
        </div>
      </div>
      <div className="profil_body">
        {loading === true ? <div>게시글 로딩중...</div> : drawProfilTL()}
      </div>
    </Modal>
  );
}
export default ProfilDetail;
