const express = require("express");
const pool = require("../config/db");
const router = express.Router();
router.post("/api/timeline", async (req, res) => {
  const id = req.body.id;
  console.log(id);
  await pool.getConnection((err, conn, rows) => {
    if (err) {
      throw err;
    } else {
      conn.query(
        `select j.region_json from account join json_table(` +
          `replace(json_array(region), ',' ,'","'),` +
          `'$[*]' columns(region_json varchar(50) path '$'))j ` +
          `where id = ?`,
        id,
        (err, rows) => {
          if (err) {
            throw err;
          } else {
            var sql =
              "select * from timeline where region like '%" +
              rows[0].region_json +
              "%'";
            for (var i = 1; i < rows.length; i++) {
              var sql = sql.concat(
                " or region like '%",
                rows[i].region_json,
                "%'"
              );
            }
            console.log(sql);
            conn.query(sql, (err, rows) => {
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
            });
          }
        }
      );
    }
  });
});
module.exports = router;
