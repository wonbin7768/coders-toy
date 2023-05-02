const express = require("express");
const pool = require("../config/db");
const router = express.Router();
router.post("/api/follower", async (req, res) => {
  const id = req.body.id;
  const offset = req.body.offset;
  const limit = req.body.limit;
  console.log(req.body);
  if (id === "") {
    return res.send("false");
  }
  await pool.getConnection((err, conn, rows) => {
    if (err) {
      throw err;
    } else {
    }
  });
});
module.exports = router;
