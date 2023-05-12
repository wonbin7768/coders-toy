const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/api/sendMessage", async (req, res) => {
  const id = req.body.id;
  console.log(id);
  await pool.getConnection((err, conn, rows) => {
    if (err) {
      throw err;
    } else {
      conn.query(
        "select * from chat where sender = ? or receiver = ?",
        [id, id],
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