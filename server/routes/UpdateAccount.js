const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const { dualUpload } = require("../middleware/multer");

router.post("/api/UpdateAccount", dualUpload, async (req, res) => {
  var sql = "";
  var content = "";
  var id = "";
  if (req.body.account === undefined) {
    id = JSON.parse(req.body.id);
    sql = "update account set profilImg = ? where id = ?;";
    content = req.files.file[0].filename;
  } else {
    id = req.body.account.id;
    var { pw, region } = req.body.account;
    if (pw === "" && region !== "") {
      sql = "update account set region = ? where id = ?;";
      content = region;
    } else {
      sql = "update account set pw = ? where id = ?;";
      content = pw;
    }
  }
  await pool.getConnection((err, conn) => {
    console.log(sql);
    console.log(content);
    console.log(id);
    if (err) {
      throw err;
    } else {
      conn.query(sql, [content, id], (err, rows, result) => {
        if (err) {
          throw err;
        } else {
          conn.release();
          if (rows[0] === undefined) {
            return res.send(false);
          } else {
            return res.send("success");
          }
        }
      });
    }
  });
});

module.exports = router;
