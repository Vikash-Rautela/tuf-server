const express = require('express');
const submissionController = require('../controllers/submissionController');
const executeCodeMiddleware = require('../middleware/executeCode');

const router = express.Router();

router.post('/', executeCodeMiddleware, submissionController.submit);
router.get('/', submissionController.getAllSubmissions);

module.exports = router;
