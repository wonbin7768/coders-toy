const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/api/UpdateUnLike", async (req, res) => {
  const { id, tl_seq, tl_like } = req.body.like;
  await pool.getConnection((err, conn) => {
    const sql1 =
      "update timelinelike set like_id = CONCAT(like_id,',',?) , tl_like = ? where tl_seq = ?; ";
    if (err) {
      throw err;
    } else {
      conn.query(sql1, [id, tl_like, tl_seq], (err, rows) => {
        if (err) {
          throw err;
        } else {
          // conn.query(sql2 , (err , rows)=>{
          //   if (err) {
          //     throw err;
          //   } else {
          //     return res.send(rows);
          //   }
          // })
          conn.release();
          return res.send(rows);
        }
      });
    }
  });
});

module.exports = router;
