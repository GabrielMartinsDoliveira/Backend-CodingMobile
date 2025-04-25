const moongose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new moongose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  score:{type: Number, default: 0}
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") && !this.isModified('confirmPassword')) return next();
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  this.confirmPassword = await bcryptjs.hash(this.password, salt);
  next();
});

const User = moongose.model('User', userSchema)

module.exports = User
