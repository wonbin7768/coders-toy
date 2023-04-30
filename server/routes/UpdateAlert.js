const express = require("express");
const pool = require("../config/db");
const router = express.Router();
router.post("/api/updateAlert", async (req, res) => {
  const alert = req.body.alert;
  console.log(alert);
  var sqlF = "update alert_fw set show_al = 1 where al_seq in (?) ";
  var sqlT = "update alert_tl set show_al = 1 where al_seq in (?) ";
  var sqlQ = "update alert_qt set show_al = 1 where al_seq in (?) ";
  let countFW = [];
  let countTL = [];
  let countQT = [];
  for (let i = 0; i < alert.length; i++) {
    if (alert[i].tl_seq !== null) {
      countTL.push(alert[i].al_seq);
    } else if (alert[i].fw_seq !== null) {
      countFW.push(alert[i].al_seq);
    } else if (alert[i].qt_seq !== null) {
      countQT.push(alert[i].al_seq);
    }
  }
  console.log(countTL);
  console.log(countFW);
  console.log(countQT);
  await pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      if (countTL.length !== 0) {
        conn.query(sqlT, [countTL], (err) => {
          if (err) {
            throw err;
          }
        });
      }
      if (countFW.length !== 0) {
        conn.query(sqlF, [countFW], (err) => {
          if (err) {
            throw err;
          }
        });
      }
      if (countQT.length !== 0) {
        conn.query(sqlQ, [countQT], (err) => {
          if (err) {
            throw err;
          }
        });
      }
      conn.release();
    }
  });
});
module.exports = router;
