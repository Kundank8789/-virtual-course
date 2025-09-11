import course from "../model/courseModel.js";

export const createCourse = async (req, res) => {
    try {
        const{ title, category} = req.body;
        if(!title || !category){
            return res.status(400).json({message: "Title and Category are required"});
        }
        const courses = await course.create({
            title,
            category,
            creator: req.user._id
        });
        return res.status(201).json({message: "Course created successfully", course: courses});
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}