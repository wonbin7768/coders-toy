const { validationResult } = require("express-validator");

const validateError = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()) {
    console.log("?");
    return next();
  }
  console.log(errors);
  return res.status(400).json({
    code: 400,
    message: errors.array()[0].msg,
    detail: errors.errors,
  });
};
const idCheck = (id) => {
  if (!/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,16}$/.test(id)) {
    throw new Error("id 정규식 에러");
  } else {
    return true;
  }
};
const pwCheck = (pw) => {
  if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/.test(pw)
  ) {
    throw new Error("pw 정규식 에러");
  } else {
    return true;
  }
};
const pwcfCheck = (pwcf, { req }) => {
  if (pwcf !== req.body.account.pw) {
    throw new Error("pwcf 불일치");
  } else {
    return true;
  }
};
const nameCheck = (name) => {
  if (!/^^[가-힣]{2,6}$/.test(name)) {
    throw new Error("name 정규식 에러");
  } else {
    return true;
  }
};
const phoneCheck = (phone) => {
  if (!/^^[0-9]{10,11}$/.test(phone)) {
    throw new Error("phone 정규식 에러");
  } else {
    return true;
  }
};
exports.validateError = validateError;
exports.idCheck = idCheck;
exports.pwCheck = pwCheck;
exports.pwcfCheck = pwcfCheck;
exports.nameCheck = nameCheck;
exports.phoneCheck = phoneCheck;
