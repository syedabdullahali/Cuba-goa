const mongoose = require("mongoose");

const chat = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "message" },
});

module.exports = mongoose.model("chat", chat);