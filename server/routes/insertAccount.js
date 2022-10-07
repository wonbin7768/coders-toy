const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/api", async (req, res) => {
  const { id, pw, name, phone } = req.body.account;
  await pool.getConnection((err, conn) => {
    if (err) {
      throw err;
      console.log("Connected");
    } else {
      conn.query(
        "insert into Account(ID , PW , Name , Phone) values(?,?,?,?);",
        [id, pw, name, phone]
      );
    }
    conn.release();
  });
  return res.send("success");
});

module.exports = router;
