const express = require("express");
const pool = require("../config/db");
const router = express.Router();
router.post("/api/timelinelike", async (req, res) => {
  await pool.getConnection((err, conn, rows) => {
    const id = req.body.id;
    const type = req.body.type;
    var sql = "";
    if (type === "tl") {
      var seq = req.body.tl_seq;
      sql = "select * from timelinelike where like_id = ? and tl_seq = ?";
    } else if (type === "qt") {
      var seq = req.body.qt_seq;
      sql = "select * from questionlike where like_id = ? and qt_seq = ?";
    }
    if (err) {
      throw err;
    } else {
      conn.query(sql, [id, seq], (err, rows) => {
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
      });
    }
  });
});
module.exports = router;
