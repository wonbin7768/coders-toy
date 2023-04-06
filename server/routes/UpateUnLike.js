const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/api/UpdateUnLike", async (req, res) => {
  const { id, tl_seq, tl_like } = req.body.like;
  await pool.getConnection((err, conn) => {
    const sql1 = "update timeline set tl_like = ? where tl_seq = ?; ";
    const sql2 = "delete from timelinelike where tl_seq = ? and like_id= ?;";
    if (err) {
      throw err;
    } else {
      conn.query(sql1, [tl_like, tl_seq], (err, rows) => {
        if (err) {
          throw err;
        } else {
          conn.query(sql2, [tl_seq, id], (err) => {
            if (err) {
              throw err;
            } else {
              conn.query(
                "select tl_like from timeline where tl_seq = ?;",
                tl_seq,
                (err, rows) => {
                  if (err) {
                    throw err;
                  } else {
                    return res.send(rows);
                  }
                }
              );
            }
          });
          conn.release();
        }
      });
    }
  });
});

module.exports = router;
