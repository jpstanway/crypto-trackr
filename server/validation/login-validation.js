const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function(data) {
  let errors = {};

  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;

  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid email";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
