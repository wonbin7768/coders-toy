const express = require("express");
const pool = require("../config/db");
const router = express.Router();
router.post("/api/searchFollower", async (req, res) => {
  const id = req.body.id;
  const follower = "%" + req.body.fw + "%"
  await pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      conn.query(
        //join 써야한다 account 와 account 의 profil img colum 추가 기본 user.png
        "select a.id , a.profilImg from account a " +
          "inner join follow f on a.id = f.follower " +
          "or a.id = f.following " +
          "where (f.follower = ? or f.following = ?) or " +
          "(f.follower = ? and f.following= ? ) " +
          "group by a.id having not id = ? and id like ?",
        [id, id, follower, id, id, follower],
        (err, rows) => {
          if (err) {
            throw err;
          } else {
            conn.release();
            console.log(rows);
            if (rows === undefined) {
              return res.send(null);
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
