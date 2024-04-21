const express = require('express');
const router = express.Router();

//import controllers
const { localFileUpload, imageUpload, videoUpload, imageReducer } = require('../controllers/fileUpload');

//api routes
// router.post('/imageUpload', imageUpload);
// router.post('/videoUpload', videoUpload);
// router.post('/image-reducer', imageReducerUpload);
router.post('/localFileUpload', localFileUpload);
router.post('/imageUpload', imageUpload);
router.post('/videoUpload', videoUpload);
router.post('/imageReducer', imageReducer);

module.exports = router