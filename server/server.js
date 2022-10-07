const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const mysql = require("mysql2/promise");
const connection = require("./config/db");
const home = require("./routes/index");
const checkid = require("./routes/checkid");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", home); //use->미들 웨어를 등록해주는 메서드
app.use("/", checkid);

app.listen(port, async () => {
  connection.connect;
  console.log(`listening on port ${port}`);
});
