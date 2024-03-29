const express = require("express");
const pool = require("../config/db");
const router = express.Router();
router.post("/api/timeline", async (req, res) => {
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
      conn.query(
        `select j.region_json  from account join json_table(` +
          `replace(json_array(region), ',' ,'","'),` +
          `'$[*]' columns(region_json varchar(50) path '$'))j ` +
          `where id = ?`,
        id,
        (err, rows) => {
          if (err) {
            throw err;
          } else {
            var sql =
              "select t.* , a.profilImg from timeline t join account a " +
              "on t.id = a.id where t.region like '%" +
              rows[0].region_json +
              "%'";
            for (var i = 1; i < rows.length; i++) {
              var sql = sql.concat(
                " or t.region like '%",
                rows[i].region_json,
                "%'"
              );
            }
            sql = sql.concat(" order by t.tl_dt desc limit ? offset ?");
            console.log(sql);
            conn.query(sql, [limit, offset], (err, rows) => {
              if (err) {
                throw err;
              } else {
                conn.release();
                if (rows[0] === undefined) {
                  return res.send(false);
                } else {
                  console.log(rows[0]);
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
