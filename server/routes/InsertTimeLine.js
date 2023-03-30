const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const { dualUpload } = require("../middleware/multer");


router.post("/api/insertTimeline",dualUpload,async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const filename = req.files.file[0].filename;
      const {id , content, tag} = JSON.parse(req.body.data);
      console.log(filename);
      conn.query(
        "insert into timeline(tl_img,id,tl_content,tag,tl_dt,tl_like) values(?,?,?,?,now(),0);",
        [filename,id,content,tag]
      );
    }
    conn.release();
  });

  return res.send("success");
});
module.exports = router;
