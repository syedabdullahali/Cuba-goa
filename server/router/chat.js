const router = require("express").Router();
// middleware
const middleware = require("../middleware/account");
// model
const User = require("../models/user");
const { findByIdAndUpdate } = require("../models/chat");
const Chat = require("../models/chat");
const Message = require("../models/message");
const { default: mongoose } = require("mongoose");
// serach user
router.get("/search-user", middleware, async (req, resp) => {
    const { search_user } = req.query;
    if (!search_user) {
        return resp.json({ success: false, msg: "No user" });
    }
    try {
        const user = new RegExp(search_user, "i");
        const findUsers = await User.find({
            $or: [{ email: user }, { name: user }],
            _id: { $ne: req.accountId },
        });
        if (findUsers.length) {
            return resp.json({ success: true, findUsers });
        }
        return resp.json({
            success: false,
            msg: "no search result",
            findUsers,
        });
    } catch (err) {
        return resp.json({ success: false, msg: err.message });
    }
});

// get existing conversations
router.get("/all-active-conversations", middleware, async (req, resp) => {
    console.log("hi")
    console.log(req.accountId);
    try {
        const chats = await Chat.find({
            users: { $in: req.accountId },
        }).populate({
            path: "users",
            model: "user",
            select: "name email",
            // match: { _id: { $ne: req.accountId } }, // Exclude logged-in user from populate
        });
        resp.send(chats);
    } catch (err) {
        resp.send(err.messge);
    }
});

// open chat if not existing create new
router.post("/get-access-to-conversation", middleware, async (req, resp) => {
    const { receiverId } = req.body;
    if (!receiverId) {
        return resp.send("no user selected");
    }
    try {
        const isChat = await Chat.findOne({
            $and: [
                { users: { $elemMatch: { $eq: req.accountId } } },
                { users: { $elemMatch: { $eq: receiverId } } },
            ],
        });
        // chat exixt
        if (isChat) {
            console.log(isChat);
            return resp.json({ msg: "chat exist", chat: isChat });
        }
        // new chat
        const newChat = await Chat.create({
            users: [req.accountId, receiverId],
        });
        console.log(newChat);
        return resp.json({ msg: "new chat", chat: newChat });
    } catch (err) {
        return resp.send(err.message);
    }
});

// get chat messages
router.get("/chat/:chatId", async (req, resp) => {
    console.log(req.params);
    try {
        const chatMessages = await Message.find({
            chat: req.params.chatId,
         }).populate("sender", "name");
        console.log(chatMessages);
        resp.send(chatMessages);
    } catch (err) {
        resp.send(err);
    }
});

//send message

router.post("/send-message", middleware, async (req, resp) => {
    const { chatId, messageContent } = req.body;
    if (!messageContent ) {
        return resp.status(400).send("Cannot send empty message or missing sender ID");
    }
    const senderId = req.accountId;
    try {
        const newMessage = {
            chat: chatId,
            sender: senderId,
            messageContent: messageContent,
        };

        const message = await Message.create(newMessage);

        const populatedMessage = await Message.findById(message._id).populate("sender");

        await Chat.findByIdAndUpdate(chatId, { latestMessage: populatedMessage });

        console.log("populated message", populatedMessage);
        resp.json(populatedMessage);
    } catch (err) {
        console.error(err);
        resp.status(500).send("Error creating and populating message");
    }
});
/*
router.post("/send-message", middleware, async (req, resp) => {
    const { chatId, messageContent } = req.body;
    if (!messageContent) {
        return resp.send("cannot send empty message");
    }

    try {
        const newMessage = {
            chat: chatId,
            sender: senderId,
            messageContent: messageContent,
        };
        const message = await Message.create(newMessage);
        // message = await Message.populate(message, {
        //     path: "chat",
        //     populate: { path: "users", select: "name" },
        // });
        // message = await Message.populate("sender")
        const populatedMessage = await Message.findById(message._id).populate("sender");
        // message = await Message.populate(message, { path: "sender" });
        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: populatedMessage,
        });

        console.log("message", populatedMessage);
        resp.send(populatedMessage);
    } catch (err) {
        resp.send(err);
    }
});

/*
router.post("/send-message", middleware, async (req, resp) => {
    const { chatId, messageContent } = req.body;
    console.log(req.body);
    if (!messageContent) {
        return resp.send("cannot send empty message");
    }

    try {
        const newMessage = {
            chat: chatId,
            sender: req.accountId,
            messageContent: messageContent,
        };

        // Create the message
        let message = await Message.create(newMessage);
        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message._id,
        });

        console.log("message", message);
        resp.send(message);
    } catch (err) {
        resp.send(err);
    }
});*/
module.exports = router;
