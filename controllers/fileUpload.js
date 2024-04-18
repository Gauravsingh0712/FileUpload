const File = require('../models/File');

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