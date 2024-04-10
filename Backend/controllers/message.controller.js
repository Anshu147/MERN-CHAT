import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body; //getting message from user as input
        const { id: receiverId } = req.params; // then we get userid from para
        const senderId = req.user._id // sendid form user

        let conversation = await Conversation.findOne({  // finde conversation between two user
            participants: { $all: [senderId, receiverId] },
        })
        if (!conversation) { // if conversation does not exist then we creat it
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }
        const newMessage = new Message({ //here we create new message
            senderId,
            receiverId,
            message,

        })

        if (newMessage) {  // here we put the message in conversation
            conversation.message.push(newMessage._id);
        }

        // conversation.save();
        // newMessage.save()
        //this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);
        //SOCKET FUNCTIONALITY WILL GO HERE
        const receiverSocketId = getReceiverSocketId(receiverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("new Message", newMessage)
        }
        res.status(201).json(newMessage); // here we send it as response

    } catch (error) {
        console.log("Error in sendMessage contorller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("message"); //NOT REFERENCE BUT ACTUAL MESSAGE
        if (!conversation) return res.status(200).json([]);
        res.status(200).json(conversation.message);
    } catch (error) {
        console.log("Error in getMessage contorller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}