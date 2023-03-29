const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    //console.log(file.originalname);
    cb(null, file.originalname + "-" + Date.now());
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
const dualUpload = upload.fields([
  { name: "file", maxCount: 10 },
  { name: "data", maxCount: 1 },
  { name: "tag", maxCount: 1 },
]);
exports.dualUpload = dualUpload;