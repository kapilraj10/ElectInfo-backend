import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js'; 

export const registerUser = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;

        // Check for missing fields
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Password length validation
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            userName,
            email,
            password: passwordHash,
            role
        });

        // Save user to database
        const savedUser = await newUser.save();

        // Return success response with token
        return res.status(201).json({
            _id: savedUser._id,
            userName: savedUser.userName,
            email: savedUser.email,
            role: savedUser.role,
            token: generateToken(savedUser._id),
            message: "User registered successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
};

export const loginUser = async (req, res) =>{
    const {userName, password, email, role} = req.body;
    const user = await User.findOne({
        userName
    });
    if(!user){
        return res.status(400).json({
            message:"Invalid username "
        })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({
            message:"Invalid password"
        })
    }

    res.status(200).json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
        message: "User logged in successfully"
    })
}