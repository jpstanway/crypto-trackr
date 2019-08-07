const bcrypt = require("bcrypt");

module.exports = function(password) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw new Error(err);
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw new Error(err);
      return hash;
    });
  });
};
