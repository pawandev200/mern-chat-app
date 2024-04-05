import jwt from "jsonwebtoken";

// creating a jwt token by passing paylod and JWT_SECRET
const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {  // JWT_SECRET: i've generated in terminal
		expiresIn: "15d",
	});

    // setting the token with name jwt in cookie 
	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // millisecond
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV !== "development", // true or false 
	});
};

export default generateTokenAndSetCookie;