const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = mongoose.model("User");
const loginValidation = require("../validation/login-validation");
const signUpValidation = require("../validation/signup-validation");

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
        return done(null, false, "Invalid credentials");
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err);
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, "Incorrect credentials");
      });
    });
  })
);

// Signup + Login
function signup({ email, password, password2, req }) {
  const { errors, isValid } = signUpValidation({ email, password, password2 });

  if (!isValid) {
    throw new Error(errors.email || errors.password || errors.password2);
  }

  const user = new User({ email, password });

  return User.findOne({ email })
    .then(existingUser => {
      if (existingUser) throw new Error("Email already in use");

      return user.save();
    })
    .then(user => {
      return new Promise((resolve, reject) => {
        req.logIn(user, err => {
          if (err) reject(err);
          resolve(user);
        });
      });
    });
}

function login({ email, password, req }) {
  const { errors, isValid } = loginValidation({ email, password });

  if (!isValid) {
    throw new Error(errors.email || errors.password);
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
