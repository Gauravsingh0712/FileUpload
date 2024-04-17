const express = require('express');
const router = express.Router();

//import controllers
const { localFileUpload } = require('../controllers/fileUpload');

//api routes
// router.post('/imageUpload', imageUpload);
// router.post('/videoUpload', videoUpload);
// router.post('/image-reducer', imageReducerUpload);
router.post('/localFileUpload', localFileUpload);

module.exports = router