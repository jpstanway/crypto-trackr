const validator = require("validator");
const isEmpty = require("./is-empty");

const signupValidation = data => {
  let errors = {};

  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid email";
  }

  if (validator.equals(data.password, data.password2)) {
    errors.password = "Passwords do not match";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Please confirm your password";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = { signupValidation };
