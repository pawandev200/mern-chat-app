import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
	try {
        // extracting the informations(message, receiver and sender ids)
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.user._id;  // user is authenticated(checked by middleware), so user exist in our db 

        // finding the conversation between these two users 
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

          // if conversation not exist, need to create it between two users 
		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}
 
        // creating new messages(using message model), coming from the user
		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});
      
        //after successfull creation of message.. push the messages id into message array of conversation 
		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

     // saving the all messages and conversation 
		// await conversation.save();
		// await newMessage.save();

		// this will run in parallel...(optimized way of above two line)
		await Promise.all([conversation.save(), newMessage.save()]);

		// SOCKET IO FUNCTIONALITY WILL GO HERE
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

        // sending newmessage as resposne 
		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
        // extracting the informations(receiver and sender ids)
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

        //checking conversation exist between them(sender and receiver) or not, to see message content used a mongoose library 
		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES, in populate passing each message one by one instead of passing whole array 

        // if conversation not exist, send response as empty 
		if (!conversation) return res.status(200).json([]);

        // if conversation exist, send all the messsage as response 
		const messages = conversation.messages;
		res.status(200).json(messages);
        
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};