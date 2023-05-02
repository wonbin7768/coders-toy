const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/api/UpdateUnLike", async (req, res) => {
  const type = req.body.type;
  if (type === "tl") {
    var { id } = req.body.like;
    var seq = req.body.like.tl_seq;
    var like = req.body.like.tl_like;
    var sql1 = "update timeline set tl_like = ? where tl_seq = ?; ";
    var sql2 = "delete from timelinelike where tl_seq = ? and like_id= ?;";
    var sql3 = "select tl_like from timeline where tl_seq = ?;";
  } else if (type === "qt") {
    var { id } = req.body.like;
    var seq = req.body.like.qt_seq;
    var like = req.body.like.qt_like;
    var sql1 = "update question set qt_like = ? where qt_seq = ?; ";
    var sql2 = "delete from questionlike where qt_seq = ? and like_id= ?;";
    var sql3 = "select qt_like from question where qt_seq = ?;";
  }
  await pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      conn.query(sql1, [like, seq], (err, rows) => {
        if (err) {
          throw err;
        } else {
          conn.query(sql2, [seq, id], (err) => {
            if (err) {
              throw err;
            } else {
              conn.query(sql3, seq, (err, rows) => {
                if (err) {
                  throw err;
                } else {
                  return res.send(rows);
                }
              });
            }
          });
          conn.release();
        }
      });
    }
  });
});

module.exports = router;
