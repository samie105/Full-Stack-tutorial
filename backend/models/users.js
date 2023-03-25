const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const vldt = require("validator");

const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.login = async function (username, password) {
  if (!username || !password) throw Error("All fields must be filled");
  const user = await this.findOne({ username });
  if (!user) throw Error("User Doesn't Exist");
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw Error("Incorrect password");
  return user;
};

userSchema.statics.signup = async function (username, password) {
  const exists = await this.findOne({ username });

  if (!username || !password) throw Error("All fields must be filled");
  if (exists) throw Error("Username already in use");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, password: hash });
  return user;
};
module.exports = mongoose.model("Todousers", userSchema);
