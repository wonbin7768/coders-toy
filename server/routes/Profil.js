const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/api/profil", async (req, res) => {
  const id = req.body.id;
  const loginID = req.body.loginID;
  await pool.getConnection((err, conn, rows) => {
    if (err) {
      throw err;
    } else {
      conn.query(
        "select id,name,region,profilImg ,"+
        "(select count(follower) from follow where follower=?) follower,"+
        "(select count(following) from follow where following=?) following, "+
        "(select count(*) from follow where follower = ? and following = ?) fCheck "+
        "from account where id = ?;",
        [id,id,loginID,id,id],
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
