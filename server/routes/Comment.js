const express = require("express");
const pool = require("../config/db");
const router = express.Router();
router.post("/api/comment", async (req, res) => {
  const type = req.body.type;
  var sql = "";
  if (type === "tl") {
    sql = "select * from comment";
  } else if (type === "qt") {
    sql = "select * from comment_qt";
  }
  await pool.getConnection((err, conn, rows) => {
    if (err) {
      throw err;
    } else {
      conn.query(sql, (err, rows) => {
        if (err) {
          throw err;
        } else {
          conn.release();
          // console.log(rows);
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
