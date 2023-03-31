const express = require("express");
const pool = require("../config/db");
const router = express.Router();
router.post("/api/timeline", async (req, res) => {
  await pool.getConnection((err, conn, rows) => {
    if (err) {
      throw err;
    } else {
      conn.query(
        "select timeline.* , timelinelike.like_id ,timelinelike.tl_like from timeline" +
          " left outer join timelinelike using (tl_seq)",
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
