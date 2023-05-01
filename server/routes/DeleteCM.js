const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.post("/api/deleteCM", async (req, res) => {
  const cm_seq = req.body.cm_seq;
  const type = req.body.type;
  var sql1 ="";
  var sql2 ="";
  if(type === "tl"){
    sql1 = "delete from comment where cm_seq = "+cm_seq+";";
    sql2 = " select * from comment;";    
  }
  else if(type === "qt"){
    sql1 = "delete from comment_qt where cm_seq = "+cm_seq+";";
    sql2 = " select * from comment_qt;";    
 
  }
  await pool.getConnection((err, conn ) => {

    if (err) {
      throw err;
    } else {
      conn.query(sql1, (err)=>{
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
