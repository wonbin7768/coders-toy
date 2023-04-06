const express = require("express");
const pool = require("../config/db");
const router = express.Router();
router.post("/api/timelinelike", async (req, res) => {
  await pool.getConnection((err, conn, rows) => {
    const id = req.body.id;
    const tl_seq = req.body.tl_seq
    if (err) {
      throw err;
    } else {
      conn.query(
        "select * from timelinelike where like_id = ? and tl_seq = ?",
        [id,tl_seq],
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
