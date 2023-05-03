const express = require("express");
const pool = require("../config/db");
const router = express.Router();
router.post("/api/question", async (req, res) => {
  const id = req.body.id;
  const offset = req.body.offset;
  const limit = req.body.limit;
  const searchCG = req.body.searchCG;
  var sql = "";
  console.log(searchCG);
  if (id === "") {
    return res.send("false");
  }
  await pool.getConnection((err, conn, rows) => {
    if (err) {
      throw err;
    } else {
      if (searchCG !== "") {
        sql =
          "select q.*,a.profilImg from question q join account a " +
          "on q.id = a.id where category like '%" +
          searchCG +
          "%'";
      } else {
        sql =
          "select q.*,a.profilImg from question q join account a " +
          "on q.id = a.id";
      }
      sql = sql.concat(" order by qt_dt desc limit ? offset ?");
      console.log(sql);
      conn.query(sql, [limit, offset], (err, rows) => {
        if (err) {
          throw err;
        } else {
          conn.release();
          console.log(rows+" hi");
          return res.send(rows);
        }
      });
    }
  });
});
module.exports = router;
