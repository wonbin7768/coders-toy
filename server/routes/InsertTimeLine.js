const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/api/insertTimeline", [], async (req, res) => {
  const { id,img,content } = req.body.posting;
  const tag = req.body.drawTag;
  await pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      conn.query(
        "insert into timeline(tl_img,tl_content ,tl_dt,tl_like,id) values(?,?,now(),0,?);",
        [tl_img, tl_content, id]
      );
    }
    conn.release();
  });
  return res.send("success");
});
module.exports = router;
