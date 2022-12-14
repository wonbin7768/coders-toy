const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const { body, check } = require("express-validator");
const validate = require("../middleware/validate");

router.post(
  "/api/idcheck",
  [
    body("idcheck.id")
      .trim()
      .notEmpty()
      .custom(async (id) => {
        await validate.idCheck(id);
      }),
    validate.validateError,
  ],
  async (req, res) => {
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
            if (rows[0] === undefined) {
              return res.send(true);
            } else {
              return res.send(false);
            }
          }
        });
      }
    });
  }
);
module.exports = router;
