const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/api/idcheck", async (req, res) => {
  const id = req.body.idcheck.id;
  console.log(id);
  await pool.getConnection((err, conn, rows) => {
    if (err) {
      throw err;
    } else {
      conn.query("select * from account where ID = ?;", id, (err, rows) => {
        if (err) {
          throw err;
        } else {
          conn.release();
          console.log(rows);
          let check = false;
        }
        if (rows[0] === undefined) {
          check = true;
          console.log(check);
          return res.send(check);
        } else {
          check = false;
          console.log(check);
          return res.send(check);
        }
      });
    }
  });
});
module.exports = router;
