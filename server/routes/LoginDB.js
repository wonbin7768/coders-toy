const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const { body, check } = require("express-validator");
const validate = require("../middleware/validate");

router.post("/api/login", async (req, res) => {
  const { id, pw } = req.body.account;
  await pool.getConnection((err, conn, rows) => {
    if (err) {
      throw err;
    } else {
      conn.query(
        "select * from account where ID = ? and PW = ?;",
        [id, pw],
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
