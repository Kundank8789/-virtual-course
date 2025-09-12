import course from "../model/CourseModel.js";

export const createCourse = async (req, res) => {
    try {
        const{ title, category} = req.body;
        if(!title || !category){
            return res.status(400).json({message: "Title and Category are required"});
        }
        const courses = await course.create({
            title,
            description,
            creator: req.userId
        });
        return res.status(201).json(course);
    } catch (error) {
        return res.status(500).json({message: `created course controller error ${error}`});
    }
}

export const getPublishedCourses = async (req, res) => {
    try {
        const courses = await course.find({isPublished: true})
        if(!courses){
            return res.status(400).json({message: "No courses found"});
        }
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({message: `getPublishedCourses controller error ${error}`});
    }
}

export const getCreatorCourses = async (req, res) => {
    try {
        const userId = req.userId;
        const courses = await course.find({creator: req.userId})
        if(!courses){
            return res.status(400).json({message: "No courses found"});
        }
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({message: `getCreatorCourses controller error ${error}`});
    }
}

export const editCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const {title, subtitle, description, category, level, price, isPublished} = req.body;
        let thumbnail
        if(req.file){
            thumbnail = await uploadsOnCloudinary(req.file.path)
        }
        let courses = await course.findById(courseId)
        if(!courses){
            return res.status(404).json({message: "Course not found"});
        }
        const updateData={ title, subtitle, description, category, level, price,thumbnail, isPublished}
        courses = await course.findByIdAndUpdate(courseId, updateData, {new: true})
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({message: `editCourse controller error ${error}`});
    }
}

export const getCourseById = async (req, res) => {
    try {
        const courseId = req.params
        let courses = await course.findById(courseId)
        if(!courses){
            return res.status(400).json({message: "Course not found"});
        }
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({message: `getCourseById controller error ${error}`});
    }
}

export const deleteCourse = async (req, res) => {
    try {
        const courseId = req.params
        let courses = await course.findById(courseId)
        if(!courses){
            return res.status(400).json({message: "Course not found"});
        }
        await course.findByIdAndDelete(courseId, {new: true})
        return res.status(200).json({message: "Course deleted successfully"});
    } catch (error) {
        return res.status(500).json({message: `deleteCourse controller error ${error}`});
    }
}