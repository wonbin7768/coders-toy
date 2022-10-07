const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};

router.post(
  "/api/idcheck",
  [
    body("idcheck.id")
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 8 })
    .withMessage("이름은3~8"),
    validate
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
  }
);
module.exports = router;
