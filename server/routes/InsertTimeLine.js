const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const { dualUpload } = require("../middleware/multer");
const multer = require('multer');
const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, '/images/')
      },
      filename: function (req, file, cb) {
          //console.log(file.originalname);
        cb(null, file.originalname + '-' + Date.now())
      }
    });
const upload = multer({ storage: storage });


router.post("/api/insertTimeline",dualUpload,async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      const file = req.files;
      const data = req.body.data;
      const tag = req.body.tag;
      console.log(file);
      console.log(data);
      console.log(tag);
    
      // conn.query(
      //   "insert into timeline(tl_img,tl_content ,tl_dt,tl_like,id) values(?,?,now(),0,?);",
      //   [tl_img, tl_content, id]
      // );
    }
    conn.release();
  });

  return res.send("success");
});
module.exports = router;
