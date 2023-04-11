const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const { dualUpload } = require("../middleware/multer");

router.post("/api/insertTimeline", dualUpload, async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const filename = req.files.file[0].filename;
      const { id, content, tag } = JSON.parse(req.body.data);
      console.log(filename);
      conn.query(
        "select region from account where id = ?",
        id,
        (err, res) => {
          if (err) {
            throw err;
          } else {
            console.log(res[0].region);
            const region = res[0].region;
            conn.query(
              "insert into timeline(tl_img,id,tl_content,tag,region,tl_dt) values(?,?,?,?,?,now());",
              [filename, id, content,tag,region]
            );
          }
        }
      );
    }
    conn.release();
  });

  return res.send("success");
});
module.exports = router;
