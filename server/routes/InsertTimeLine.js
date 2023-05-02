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
      var { id, content, tag, catagory } = JSON.parse(req.body.data);
      console.log(catagory);
      const { type } = req.body;
      var sql_insert = "";
      var sql_select = "";
      var sql_insert_alert = "";
      if (type === "tl") {
        sql_insert =
          "insert into timeline(tl_img,id,tl_content,tag,region,tl_dt) values(?,?,?,?,?,now());";
        sql_select = "select tl_seq from timeline where tl_img = ?;";
        sql_insert_alert =
          "insert into alert_tl(tl_seq,al_receiver,tl_sender) values (?,?,?);";
      } else if (type === "qt") {
        sql_insert =
          "insert into question(qt_img,id,qt_content,tag,region,qt_dt,catagory) values(?,?,?,?,?,now(),?);";
        sql_select = "select qt_seq from question where qt_img = ?;";
        sql_insert_alert =
          "insert into alert_qt(qt_seq,al_receiver,qt_sender) values (?,?,?);";
      }
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
              if (catagory !== "") {
                conn.query(sql_insert, [
                  filename,
                  id,
                  content,
                  tag,
                  region,
                  catagory,
                ]);
              } else {
                conn.query(sql_insert, [filename, id, content, tag, region]);
              }
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
              if (catagory !== "") {
                conn.query(sql_insert, [
                  filename,
                  id,
                  content,
                  tag,
                  region,
                  catagory,
                ]);
              } else {
                conn.query(sql_insert, [filename, id, content, tag, region]);
              }
              console.log("hi" + filename);
              conn.query(sql_select, [filename], (err, row) => {
                if (err) {
                  throw err;
                } else {
                  if (type === "tl") {
                    conn.query(
                      sql_insert_alert,
                      [row[0].tl_seq, tag, id],
                      (err) => {
                        if (err) {
                          throw err;
                        } else {
                          console.log("success!!");
                        }
                      }
                    );
                  } else {
                    conn.query(
                      sql_insert_alert,
                      [row[0].qt_seq, tag, id],
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
              });
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
