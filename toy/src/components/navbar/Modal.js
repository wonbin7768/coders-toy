import { useEffect, useState } from "react";
import "./Modal.css";
import axios from "axios";
function Modal(props) {
  var { open, close, header } = props;
  useEffect(() => {
    console.log(open);
    console.log("hi modal");
  }, []);
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button
              className="close"
              onClick={() => {
                close();
                // window.location.reload();
              }}
            >
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            <button
              className="close"
              onClick={() => {
                close();
                // window.location.reload();
              }}
            >
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
}
export default Modal;
