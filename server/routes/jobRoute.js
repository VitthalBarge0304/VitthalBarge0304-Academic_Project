const express = require('express')
const {getJobsList} = require('../controllers/jobController')
const {protect} = require('../middleware/authMiddleware')

const router = express.Router();

// router.post('/jobsDetails',currentUser);
router.get('/jobsDetails',protect,getJobsList);

module.exports= router;