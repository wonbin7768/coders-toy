const express = require("express");
const pool = require("../config/db");
const router = express.Router();
router.post("/api/searchPeople", async (req, res) => {
  const follower = "%" + req.body.fw + "%";
  await pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      conn.query(
        //join 써야한다 account 와 account 의 profil img colum 추가 기본 user.png
        "select id,profilImg from account where id like ? order by id asc limit 10 offset 0",
        [follower],
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
