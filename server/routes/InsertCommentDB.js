const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const { body } = require("express-validator");
const validate = require("../middleware/validate");

router.post("/api/insertCM", [], async (req, res) => {
  const { id,cm_content,tl_seq } = req.body.insertCM;
  await pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      conn.query(
        "insert into comment(id , cm_content , tl_seq , cm_dt) values(?,?,?,now());",
        [id, cm_content, tl_seq]
      );
    }
    conn.release();
  });
  return res.send("success");
});

module.exports = router;
