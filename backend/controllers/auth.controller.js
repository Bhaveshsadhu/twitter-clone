import validator from 'validator';
import userModel from '../models/user.model.js';
import { hashPassword } from '../utils/util.js';
export const registerUser = async (req, res, next) => {
    try {
        const { name, username, email, password } = req.body;

        // Simple validation
        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        // check valid emil
        if (validator.isEmail(email) === false) {
            return res.status(400).json({ message: "Please enter a valid email address" });
        }
        // Password length validation  
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ messsage: "User with this email already exists" });
        }

        // Make Password Hash
        const passwordHash = await hashPassword(password);

        const newUser = new userModel({
            name,
            username,
            email,
            password: passwordHash
        })

        const savedUser = await newUser.save()

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: savedUser
        })

    } catch (error) {
        next(error)
    }
}
export const loginUser = (req, res, next) => {
    try {
        res.send('Login User');
    } catch (error) {
        next(error)
    }
}
export const logoutUser = (req, res, next) => {
    try {
        res.send('Logout User');

    } catch (error) {
        next(error)
    }
}