const express = require("express");
const pool = require("../config/db");
const router = express.Router();
router.post("/api/follower", async (req, res) => {
  const id = req.body.id;
  const offset = req.body.offset;
  const limit = req.body.limit;
  console.log(req.body);
  if (id === "") {
    return res.send("false");
  }
  await pool.getConnection((err, conn, rows) => {
    if (err) {
      throw err;
    } else {
      conn.query(
        "select following from follow where follower = ?",
        id,
        (err, rows) => {
          if (err) {
            throw err;
          } else {
            var data = [];
            sql =
              "select t.*,a.profilImg from timeline t join account a " +
              "on t.id = a.id where t.id in(?)";
            sql = sql.concat(" order by tl_dt desc limit ? offset ?");
            for (var i = 0; i < rows.length; i++) {
              data.push(rows[i].following);
            }
            conn.query(sql, [data, limit, offset], (err, rows) => {
              if (err) {
                throw err;
              } else {
                console.log(rows);
                conn.release();
                return res.send(rows);
              }
            });
          }
        }
      );
    }
  });
});
module.exports = router;
