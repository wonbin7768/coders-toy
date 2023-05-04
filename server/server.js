const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
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
const UpdateUnLike = require("./routes/UpateUnLike");
const timelinelike = require("./routes/TimeLineLike");
const updateAccount = require("./routes/UpdateAccount");
const Alert = require("./routes/Alert");
const profil = require("./routes/Profil");
const profilTimeline = require("./routes/ProfilTimeline");
const updateFollow = require("./routes/UpdateFollow");
const updateAlert = require("./routes/UpdateAlert");
const provideQuestion = require("./routes/ProvideQuestion");
const searchPeople = require("./routes/SearchPeople");
const provideFollower = require("./routes/ProvideFollower");
const deleteTL = require("./routes/DeleteTL");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", insertAccountDB); //use->미들 웨어를 등록해주는 메서드
app.use("/", checkID);
app.use("/", loginDB);
app.use("/", provideTL, express.static("images"));
app.use("/", comment);
app.use("/", insertCM);
app.use("/", deleteCM);
app.use("/", updateLike);
app.use("/", insertTL);
app.use("/", searchFollower);
app.use("/", UpdateUnLike);
app.use("/", timelinelike);
app.use("/", updateAccount);
app.use("/", Alert);
app.use("/", profil);
app.use("/", profilTimeline);
app.use("/", updateFollow);
app.use("/", updateAlert);
app.use("/", provideQuestion);
app.use("/", searchPeople);
app.use("/", provideFollower);
app.use("/", deleteTL);

app.listen(port, async () => {
  connection.connect;
  console.log(`listening on port ${port}`);
});
