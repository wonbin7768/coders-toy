const pool = require("../config/db");
const InsertMesage = (data) => {
  const { sender, receiver, message } = data;
  pool.getConnection((err, conn) => {
    if (err) {
      throw err;
    } else {
      conn.query(
        "insert into chat(sender , receiver , message) values(?,?,?);",
        [sender, receiver, message]
      );
    }
    conn.release();
  });
  return res.send("success");
};

exports.InsertMesage = InsertMesage;
