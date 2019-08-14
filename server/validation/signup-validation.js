const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function(data) {
  let errors = {};

  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.password2 = isEmpty(data.password2) ? "" : data.password2;

  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid email";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field required";
  }

  if (!validator.isLength(data.password, { min: 6, max: 12 })) {
    errors.password = "Password must be between 6-12 characters";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field required";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords do not match";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
