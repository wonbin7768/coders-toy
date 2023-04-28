const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/api/Alert", async (req, res) => {
  const id = req.body.id;
  await pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      var sql =
        "select * from (select al_seq,tl_sender,tl_seq,al_receiver,show_al,al_dt , +" +
        "null as fw_seq, null as follower, null as following from alert_tl " +
        "where al_receiver like '%" +
        id +
        "%'" +
        " union " +
        "select al_seq , null as tl_seq ,null as tl_sender ,null as al_receiver, show_al, al_dt ," +
        "fw_seq,follower,following from alert_fw where following = '" +
        id +
        "' " +
        ") as alerts " +
        "order by al_dt desc limit 10 offset 0 ;";

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
  });
});
module.exports = router;
