const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/api/deleteCM", async (req, res) => {
  const cm_seq = req.body.cm_seq;
  await pool.getConnection((err, conn ) => {
    const sql1 = "delete from comment where cm_seq = ?;  ";
    const sql2 = " select * from comment;";
    if (err) {
      throw err;
    } else {
      conn.query(sql1, [cm_seq] , (err)=>{
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
