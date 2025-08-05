import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";

export const signUp = async (req, res) => {
    try {
        const { name, email, password, role} = req.body;

        let exitUser = await User.findOne({ email });
        if(exitUser){
            return res.status(400).json({message: "User already exists"});
        }
        if (validator.isEmail(email)){
            return res.status(400).json({message: "Enter valid email"});
        }
        if (password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters long"});
        }
        let hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role
        });
        let token = await genToken(user._id);
        req.cookies("token", token, {
            httpOnly: true,
            secure: "false",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json({message: `signUp error ${error}`});
    }
}  

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({message: "User does not exist"});
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: "Incorrect password"});
        }
        let token = await genToken(user._id);
        req.cookies("token", token, {
            httpOnly: true,
            secure: "false",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: `Login error ${error}`});
    }
}

export const logout = async (req, res) => {
    try {
        await res.clearCookie("token")
        return res.status(200).json({message: "Logout successful"});

    } catch (error) {
        return res.status(500).json({message: `Logout error ${error}`});
    }
}