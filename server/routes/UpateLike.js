const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/api/UpdateLike", async (req, res) => {
  const { id, tl_seq ,tl_like } = req.body.like;
  await pool.getConnection((err, conn ) => {
    const sql1 = "update timelinelike(tl_seq,id,tl_like) values(?,?,?);  ";
    const sql2 = " select * from comment;";
    if (err) {
      throw err;
    } else {
      conn.query(sql1, [tl_seq,id,tl_like] , (err)=>{
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
