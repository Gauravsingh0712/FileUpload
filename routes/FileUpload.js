const express = require('express');
const router = express.Router();

//import controllers
const { localFileUpload, imageUpload } = require('../controllers/fileUpload');

//api routes
// router.post('/imageUpload', imageUpload);
// router.post('/videoUpload', videoUpload);
// router.post('/image-reducer', imageReducerUpload);
router.post('/localFileUpload', localFileUpload);
router.post('/imageUpload', imageUpload);

module.exports = router