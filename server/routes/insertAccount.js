const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const { body } = require("express-validator");
const validate = require("../middleware/validate");

router.post(
  "/api",
  [
    body("account.id")
      .trim()
      .custom((id) => {
        validate.idcheck(id);
      }),
    body("account.pw").trim(),
    body("account.name").trim(),
    body("account.phone").trim(),
    validate.validateError,
  ],
  async (req, res) => {
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
  }
);

module.exports = router;
