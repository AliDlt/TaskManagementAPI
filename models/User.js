const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "نام اجباری می باشد."],
  },
  email: {
    type: String,
    required: [true, "ایمیل اجباری می باشد."],
  },
  password: {
    type: String,
    required: [true, "رمز عبور اجباری می باشد."],
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
