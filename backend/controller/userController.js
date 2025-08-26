import uploadsOnCloudinary from "../config/cloudinary.js";
import User from "../model/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if(!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `GetCurrentUser error: ${error}` });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {description, name} = req.body;
    let photoUrl
    if(req.file){
      photoUrl = await uploadsOnCloudinary(req.file.path)
    }
    const user = await User.findByIdAndUpdate(userId,{name, description, photoUrl})
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ message: `UpdateProfile error: ${error}` });
    
  }
}