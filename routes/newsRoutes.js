const express = require('express');
const newsController = require('../controllers/newsController');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, newsController.getNews);

module.exports = router;
