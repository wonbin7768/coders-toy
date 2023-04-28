const express = require("express");
const pool = require("../config/db");
const router = express.Router();
const { dualUpload } = require("../middleware/multer");
router.post("/api/insertTimeline", dualUpload, async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      if (req.files.file === undefined) {
        var filename = "cat.jpg";
      } else {
        filename = req.files.file[0].filename;
      }
      const { id, content, tag } = JSON.parse(req.body.data);
      console.log(filename);
      if (tag === "") {
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
                [filename, id, content, tag, region]
              );
            }
          }
        );
      } else {
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
                [filename, id, content, tag, region]
              );
              console.log("hi"+filename);
              conn.query(
                "select tl_seq from timeline where tl_img = ?;",
                [filename],
                (err, row) => {
                  if (err) {
                    throw err;
                  } else {
                    console.log(row[0].tl_seq);
                    conn.query(
                      "insert into alert_tl(tl_seq,al_receiver) values (?,?);",
                      [row[0].tl_seq, tag],
                      (err) => {
                        if (err) {
                          throw err;
                        } else {
                          console.log("success!!");
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
    conn.release();
  });

  return res.send("success");
});
module.exports = router;
