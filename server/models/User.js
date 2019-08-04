const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  email: String,
  password: String,
  portfolio: [
    {
      name: String,
      price: String,
      amount: Number
    }
  ]
});

// encrypt password before saving user to database
UserSchema.pre("save", function save(next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// compare passwords on login
UserSchema.methods.comparePassword = function comparePassword(
  loginPassword,
  cb
) {
  bcrypt.compare(loginPassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

mongoose.model("User", UserSchema);
