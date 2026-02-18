const mongoose = require("mongoose");
const bycrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "A user must have a name"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "A user must have an email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "A user must have a password"],
      minlength: 6,
      select: false, //Will not return password in queries by default
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
  },
  //
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
