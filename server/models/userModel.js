const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields should be filled up!!");
  }

  if (!validator.isEmail(email)) {
    throw Error("email is not valid!!");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is too weak!!");
  }

  const exist = await this.findOne({ email });
  if (exist) {
    throw Error("email already exist!!");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields should be filled up!!");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("User doesn't exist!!");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Wrong Password!!");
  }
  return user
};

module.exports = mongoose.model("User", userSchema);
