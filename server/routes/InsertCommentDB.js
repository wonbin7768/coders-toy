const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/api/insertCM", async (req, res) => {
  const { id, cm_content, seq } = req.body.insertCM;
  const type = req.body.type;
  var sql1 = "";
  var sql2 = "";
  if (type === "tl") {
    sql1 =
      "insert into comment(id , cm_content , tl_seq , cm_dt) values(?,?," +
      seq +
      ",now());  ";
      sql2 = " select * from comment;";
    } else if (type === "qt") {
    sql1 =
      "insert into comment_qt(id , cm_content , qt_seq , cm_dt) values(?,?," +
      seq +
      ",now());  ";
      sql2 = " select * from comment_qt;";

  }
  await pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      conn.query(sql1, [id, cm_content], (err) => {
        if (err) {
          throw err;
        } else {
          conn.query(sql2, (err, rows) => {
            if (err) {
              throw err;
            } else {
              return res.send(rows);
            }
          });
          conn.release();
        }
      });
    }
  });
});

module.exports = router;
