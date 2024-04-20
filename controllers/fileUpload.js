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

async function uploadFileToCloudinary(file, folder) {
    const options = { folder }
    return await cloudinary.uploader.upload(file.tempFilePath,)
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
