const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 6, required: true },
    token: { type: String, default: null },
    avatarURL: { type: String, required: true, default: "avatars/default.png" },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },

  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

module.exports = User;
