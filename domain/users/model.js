const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: String,
    flightId: String,
    bags: Number,
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
);

const User = model("User", userSchema);

module.exports = User;
