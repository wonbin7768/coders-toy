const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/api/deleteTL", async (req, res) => {
  const seq = req.body.seq;
  const type = req.body.type;
  const loginID = req.body.loginID;
  var sql1 = "";
  var sql2 =
    "select * from (" +
    "select tl_seq , tl_img ,tl_content,tl_dt,id,tl_like, null as qt_seq ,null as qt_img,null as qt_content" +
    ",null as qt_dt ,null as qt_like from timeline where id = ?" +
    " union " +
    "select null as tl_seq, null as tl_img ,null as tl_content,null as tl_dt, id,null as tl_like ,qt_seq,qt_img,qt_content" +
    ",qt_dt,qt_like from question where id = ?) as a;";
  if (type === "tl") {
    sql1 = "delete from timeline where tl_seq = " + seq + ";";
  } else if (type === "qt") {
    sql1 = "delete from question where qt_seq = " + seq + ";";
  }
  await pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      conn.query(sql1, (err) => {
        if (err) {
          throw err;
        } else {
          conn.query(sql2, [loginID, loginID], (err, rows) => {
            if (err) {
              throw err;
            } else {
              conn.release();
              return res.send(rows);
            }
          });
        }
      });
    }
  });
});

module.exports = router;
