const express = require("express");
const pool = require("../config/db");
const router = express.Router();
router.post("/api/updateFollow", async (req, res) => {
  const { id, loginID, bool } = req.body;
  console.log(id, loginID, bool);
  let sql = "";
  if (bool === 0) {
    sql =
      "insert into follow(follower,following) values('" +
      loginID +
      "','" +
      id +
      "');";
  } else {
    sql =
      "delete from follow where follower = '" +
      loginID +
      "' and following = '" +
      id +
      "';";
  }
  await pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      conn.query(sql, (err) => {
        if (err) {
          throw err;
        } else {
          if (bool === 0) {
            conn.query(
              "select fw_seq from follow where follower = ? and following = ?",
              [loginID, id],
              (err, row) => {
                if (err) {
                  throw err;
                } else {
                  console.log(row[0].fw_seq);
                  conn.query(
                    "insert into alert_fw(fw_seq,follower,following) values(?,?,?);",
                    [row[0].fw_seq, loginID, id],
                    (err) => {
                      if (err) {
                        throw err;
                      } else {
                        conn.release();
                        return res.send(true);
                      }
                    }
                  );
                }
              }
            );
          } else {
            return res.send(true);
          }
        }
      });
    }
  });
});
module.exports = router;
