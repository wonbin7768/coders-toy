const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/api/loadMessageRoom", async (req, res) => {
  const id = req.body.id;
  console.log(id);
  await pool.getConnection((err, conn, rows) => {
    if (err) {
      throw err;
    } else {
      conn.query(
        "select sender , receiver , message , ct_dt from(" +
          "select sender, receiver, message, ct_dt," +
          " ROW_NUMBER() OVER (PARTITION BY CASE WHEN sender = ? THEN receiver ELSE sender END " +
          " ORDER BY ct_dt DESC) AS rn" +
          " FROM chat WHERE sender = ? OR receiver = ? ) as subquery " +
          "where rn = 1;",
        [id, id, id],
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
