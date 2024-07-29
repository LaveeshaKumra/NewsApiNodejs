const express = require('express');
const preferenceController = require('../controllers/preferenceController');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, preferenceController.getPreferences);
router.put('/', authMiddleware, preferenceController.updatePreferences);

module.exports = router;
