const express = require('express')
const {currentUser} = require('../controllers/userController')


const router = express.Router();

router.get('/getCurrentUser',currentUser);

module.exports= router;