const express = require('express');


const authController = require('../controller/signinGoogleLinkedInController');

const router = express.Router();





// Define the LinkedIn callback route
router.get('/linkedin/callback',authController.linkedinCallback
);

module.exports = router;
