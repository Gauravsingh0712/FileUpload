const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();

const fileSchema = new mongoose.Schema({
    name: {
        type: String
    },
    imageUrl: {
        type: String
    },
    type: {
        type: String
    },
    email: {
        type: String
    }
})

// nodemailer
fileSchema.post("save", async function (doc) {
    try {
        console.log("DOC : ", doc)

        // transporter
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
        })

        // send mail 
        const info = await transporter.sendMail({
            from: 'From Priyansh',
            to: doc.email,
            subject: "New File Uploaded to Cloudinary",
            html: `<h2>File Uploaded</h2> <br> view now - <a href="${doc.fileUrl}">CLick Here</a>`
        })

        console.log("Info : ", info)
    }
    catch (err) {
        console.log(err);
    }
})

module.exports = mongoose.model('File', fileSchema)