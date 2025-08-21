import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import sendMail from "../config/sendMail.js";

export const signUp = async (req, res) => {
    try {
        const { name, email, password, role} = req.body;

        let exitUser = await User.findOne({ email });
        if(exitUser){
            return res.status(400).json({message: "User already exists"});
        }
        if (!validator.isEmail(email)){
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
        res.cookie("token", token, {
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
        res.cookie("token", token, {
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

export const sendOTP= async (req, res)=>{
    try {
        const {email} =req.body;
        const user = await User.findOne({ email });

        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        user.resetOtp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
        user. isOtpVerified = false

        await user.save();
        await sendMail(email, otp);
        return res.status(200).json({message: "OTP sent successfully"});
    } catch (error) {
        return res.status(500).json({message: `sendOTP error ${error}`});
    }

}

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({email})
        if(!user || user.resetOtp !=otp || user.otpExpires < Date.now()){
            return res.status(400).json({message: "Invalid  OTP"});
        }
        user.isOtpVerified = true;
        user.resetOtp = undefined;
        user.otpExpires = undefined;
        await user.save();
        return res.status(200).json({message: "OTP verified successfully"});
    } catch (error) {
        return res.status(500).json({message: `verify OTP error ${error}`});
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { email, Password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Otp Verification is required" });
        }
       const hashPassword = await bcrypt.hash(Password, 6);
       user.password = hashPassword;
       user.isOtpVerified = false;
        await user.save();
        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        return res.status(500).json({ message: `resetPassword error ${error}` });
    }
}