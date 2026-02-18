const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

//Password Encryption before saving

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 6);
  return next();
});
userSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
