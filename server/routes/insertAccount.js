const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const { body } = require("express-validator");
const validate = require("../middleware/validate");

router.post(
  "/api",
  [
    body("account.id").trim().notEmpty().bail(),
    body("account.pw")
      .trim()
      .notEmpty()
      .custom(async (pw) => {
        await validate.pwCheck(pw);
      })
      .bail(),
    body("account.pwcf")
      .trim()
      .notEmpty()
      .custom(async (pw, { req }) => {
        await validate.pwcfCheck(pw,{req});
      })
      .bail(),
    body("account.name")
      .trim()
      .notEmpty()
      .custom(async (name) => {
        await validate.nameCheck(name);
      })
      .bail(),
    body("account.phone")
      .trim()
      .notEmpty()
      .custom(async (phone) => {
        await validate.phoneCheck(phone);
      })
      .bail(),
    validate.validateError,
  ],
  async (req, res) => {
    const { id, pw, name, phone } = req.body.account;
    await pool.getConnection((err, conn) => {
      if (err) {
        throw err;
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
