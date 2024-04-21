const File = require('../models/File');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

//localfileupload -> handler function
exports.localFileUpload = async (req, res) => {
    try {
        //fetch file
        const file = req.files.file;
        console.log("file aa gyii  ->", file);

        //create a path where file will be stored
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
        console.log("file path ->", path);

        //move file to path
        file.mv(path, (err) => {
            console.log(err)
        })

        //save file in database
        res.json({
            message: "file uploaded successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
    if (quality) {
        options.quality = quality;
    }
    options.resource_type = "auto"
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}
//Image upload handler function
//image upload ka hadnler
exports.imageUpload = async (req, res) => {
    try {
        //data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }

        //file format supported hai
        console.log("Uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image Successfully Uploaded',
        })
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong',
        });

    }
}

//video upload handler function
exports.videoUpload = async (req, res) => {
    try {
        // Fetch Data 
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const videoFile = req.files.videoFile;

        // Validation 
        const supportedTypes = ["mp4", "mov"];
        const fileType = videoFile.name.split(".")[1].toLowerCase();

        // HW - File Maximum 5MB
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }

        // Supported 
        // File Upload to the Cloudinary 
        const response = await uploadFileToCloudinary(videoFile, "Codehelp");

        // Upload To DB
        const vidFile = new File({
            name,
            tags,
            email,
            videoUrl: response.secure_url
        })

        const file = await vidFile.save();

        res.status(200).json({
            success: true,
            message: "video file uploaded successfully",
            file: file
        })
    }
    catch (err) {
        console.error(err)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

exports.imageReducer = async (req, res) => {
    try {

        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        // Fetch file 
        const imageFile = req.files.imageFile;
        console.log(imageFile);

        const supportedTypes = ["png", "jpg", "jpeg"];
        const fileType = imageFile.name.split('.')[1].toLowerCase();

        // Check file type is supported or not 
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }

        // Upload to Cloudinary
        // HW - Decrease size by height and width 
        const response = await uploadFileToCloudinary(imageFile, "Codehelp", 50);
        console.log(response)


        // Upload to DB 
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })


        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            file: fileData
        })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}
