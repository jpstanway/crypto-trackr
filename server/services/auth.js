const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = mongoose.model("User");
const signupValidation = require("../validation/signup-validation");
const loginValidation = require("../validation/login-validation");

// Sessions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Authentication
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) return done(err);
      if (!user) {
        return done(null, false, { message: "Invalid email" });
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err);
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { message: "Incorrect password" });
      });
    });
  })
);

// Signup + Login
function signup({ email, password, password2, req }) {
  const { errors, isValid } = signupValidation({ email, password, password2 });

  if (!isValid) {
    return errors;
  }

  const user = new User({ email, password });

  return User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        errors.email = "Email already in use";
        return errors;
      }

      return user.save();
    })
    .then(user => {
      return new Promise((resolve, reject) => {
        req.login(user, err => {
          if (err) reject(err);
          resolve(user);
        });
      });
    });
}

function login({ email, password, req }) {
  const { errors, isValid } = loginValidation({ email, password });

  if (!isValid) {
    return errors;
  }

  return new Promise((resolve, reject) => {
    passport.authenticate("local", (err, user) => {
      if (!user) reject("Invalid credentials");
      req.login(user, () => resolve(user));
    })({ body: { email, password } });
  });
}

// Update + Delete
function changePassword({ email, oldPassword, newPassword, req }) {
  if (!req.user)
    throw new Error("You must be logged in to perform this action");

  return new Promise((resolve, reject) => {
    return User.findOne({ email }).then(user => {
      // compare old password
      user.comparePassword(oldPassword, (err, isMatch) => {
        if (err) reject(err);
        if (isMatch) {
          user.password = newPassword;
          return user.save().then(() => {
            resolve(user);
          });
        }
        return false;
      });
    });
  });
}

function deleteAccount({ email, req }) {
  if (!req.user) {
    throw new Error("You must be logged in to perform this action");
  }

  return User.findOneAndDelete({ email }).then(user => {
    return user;
  });
}

module.exports = { signup, login, changePassword, deleteAccount };
