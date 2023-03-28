const multer = require("multer");
const memoryStorage = multer.memoryStorage();
const upload = multer({ storage: memoryStorage });

const dualUpload = upload.fields([
  { name: "file", maxCount: 10 },
  { name: "data", maxCount: 1 },
  { name: "tag", maxCount: 1 },
]);
exports.dualUpload = dualUpload;
