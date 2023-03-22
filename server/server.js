const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const mysql = require("mysql2/promise");
const connection = require("./config/db");
const insertAccountDB = require("./routes/InsertAccountDB");
const checkID = require("./routes/CheckIdDB");
const loginDB = require("./routes/LoginDB");
const provideTL = require("./routes/ProvideTimeLineDB");
const comment = require("./routes/Comment");
const insertCM = require("./routes/InsertCommentDB");
const deleteCM = require("./routes/DeleteCM");
const updateLike = require("./routes/UpateLike");
const insertTL = require("./routes/InsertTimeLine");
const searchFollower = require("./routes/SearchFollower");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", insertAccountDB); //use->미들 웨어를 등록해주는 메서드
app.use("/", checkID);
app.use("/", loginDB);
app.use("/", provideTL);
app.use("/", comment);
app.use("/", insertCM);
app.use("/", deleteCM);
app.use("/", updateLike);
app.use("/", insertTL);
app.use("/", searchFollower);

app.listen(port, async () => {
  connection.connect;
  console.log(`listening on port ${port}`);
});
