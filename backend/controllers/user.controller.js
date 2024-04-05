import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;  // getting the loggedin user 

        // On sidebar, i want all users except the loggedin users, without their passwords 
		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        // sendig the filtered users as response 
		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};