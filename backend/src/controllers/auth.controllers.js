import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    // Check if emailis valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // 123456 => asd#$@!23 => hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    if (newUser) {
        // generateToken(newUser._id, res)
        //  await newUser.save();

    // persist user first, then issue auth cookie
    const savedUser = await newUser.save();
    generateToken(savedUser._id, res);


          res
           .status(201)
           .json({
             _id: newUser._id,
             fullName: newUser.fullName,
             email: newUser.email,
             profilePic: newUser.profilePic,
           });

           try {
            
            await sendWelcomeEmail(
                newUser.email,
                newUser.fullName,
                ENV.CLIENT_URL
            );
           } catch (error) {
            console.error("Failed to send welcome email:", error);
            
           }
      
    }else {
     return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error in  signup controller:", error);
    return res.status(500).json({ message: "Internal server error" });
    
  }
};
