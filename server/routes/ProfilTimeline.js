const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/api/profilTimeline", async (req, res) => {
  const id = req.body.id;
  await pool.getConnection((err, conn, rows) => {
    if (err) {
      throw err;
    } else {
      conn.query(
        "select * from (" +
          "select tl_seq , tl_img ,tl_content,tl_dt,id,tl_like, null as qt_seq ,null as qt_img,null as qt_content" +
          ",null as qt_dt ,null as qt_like from timeline where id = ?" +
          " union " +
          "select null as tl_seq, null as tl_img ,null as tl_content,null as tl_dt, id,null as tl_like ,qt_seq,qt_img,qt_content" +
          ",qt_dt,qt_like from question where id = ?) as a;",
        [id, id],
        (err, rows) => {
          if (err) {
            throw err;
          } else {
            conn.release();
            console.log(rows);
            if (rows[0] === undefined) {
              return res.send(false);
            } else {
              return res.send(rows);
            }
          }
        }
      );
    }
  });
});
module.exports = router;
