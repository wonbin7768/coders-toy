const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/api/insertCM", async (req, res) => {
  const { id, cm_content, tl_seq } = req.body.insertCM;
  await pool.getConnection((err, conn ) => {
    const sql1 = "insert into comment(id , cm_content , tl_seq , cm_dt) values(?,?,?,now());  ";
    const sql2 = " select * from comment;";
    if (err) {
      throw err;
    } else {
      conn.query(sql1, [id, cm_content, tl_seq] , (err)=>{
        if (err) {
          throw err;
        } else {
          conn.query(sql2 , (err , rows)=>{
            if (err) {
              throw err;
            } else {
              return res.send(rows);
            }  
          })
          conn.release();
        }
      });
    }
  });
});

module.exports = router;