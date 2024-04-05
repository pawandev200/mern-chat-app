import  express  from 'express';
import  dotenv  from 'dotenv';
import cookieParser from "cookie-parser";
import connectToMongoDB from './db/connectToMongoDB.js';

import authRoutes from "./routes/auth.routes.js";  // need to add .js at the end
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import {app, server} from "./socket/socket.js"

// for deployment
import path from "path";
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 8000 ; 

dotenv.config();   // To initialize the dotenv function

app.use(express.json()); //allow us to extract the user inputed data
app.use(cookieParser()); // calling it to access of cookie: to extract the token from cookie 

app.use('/api/auth', authRoutes);  // /api/auth --> acts like prefix of routes
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
    connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});
