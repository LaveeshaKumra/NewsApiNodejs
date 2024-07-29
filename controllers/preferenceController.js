const { users } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.getPreferences = async (req, res) => {
    try {
        const userObj = await users.find(item => item.username ===  req.user.username );
        if (!userObj) return res.status(404).send('User not found.');

        res.json(userObj.preferences);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.updatePreferences = async (req, res) => {
    console.log("in put");
    console.log(req.user);

    try {
        // Extract preferences from the request body
        const { preferences } = req.body;

        // Validate that preferences is an array of strings
        if (!Array.isArray(preferences) || !preferences.every(p => typeof p === 'string')) {
            return res.status(400).send('Preferences should be an array of strings.');
        }

        const userObj = await users.find(item => item.username ===  req.user.username );
        userObj.preferences=preferences;
        console.log(userObj)
        // If user is not found, return a 404 error
        if (!userObj) return res.status(404).send('User not found.');

        // Reissue the token with updated preferences
        const token = jwt.sign({
            username: userObj.username,
            preferences: userObj.preferences
        }, JWT_SECRET, { expiresIn: '1h' });

        // Return the updated preferences and new token
        res.json({ preferences: userObj.preferences, token });
        console.log(users)
    } catch (err) {
        // Handling any errors that occur
        res.status(500).send(err.message);
    }
};
