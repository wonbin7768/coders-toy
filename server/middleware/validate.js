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
const idcheck = (id) => {
    if(!/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,16}$/.test(id)) {
      console.log("fuck");
      throw new Error('정규식 에러');
    }else{ 
      console.log("good");
      return true;
    }
  };

exports.validateError = validateError;
exports.idcheck = idcheck;
