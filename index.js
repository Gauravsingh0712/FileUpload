
const express = require('express');
const app = express();
const fileupload = require("express-fileupload");

require('dotenv').config();
const Port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(fileupload());

//connect to database
const db = require('./config/database');
db.connect();

//import cloudinary
require('./config/cloudinary').cloudinaryConnect();

//api routes
const Upload = require('./routes/FileUpload');
app.use('/api/v1/upload', Upload);

//activate the server
app.listen(Port, () => console.log(`Server running on port ${Port}`));



