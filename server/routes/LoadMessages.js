const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/api/loadMessages", async (req, res) => {
  const sender = req.body.sender;
  const receiver = req.body.receiver;
  await pool.getConnection((err, conn, rows) => {
    if (err) {
      throw err;
    } else {
      conn.query(
        "select * from chat where (sender = ? and receiver = ? ) " +
          "or (sender = ? and receiver = ?)",
        [sender, receiver, receiver, sender],
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
