const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "chat" },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    messageContent: String,
});

module.exports = mongoose.model("message", messageSchema);