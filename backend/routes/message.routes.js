import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages); // get messages of current(sender) and id(jo url me passed hai) bala users 
router.post("/send/:id", protectRoute, sendMessage);  // sending message by current(sender) user to id(jo url me passed hai) bala user 

export default router;