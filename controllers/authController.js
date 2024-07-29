const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../models/userModel');
const { validateRegistration, validateLogin } = require('../utils/validation');
const JWT_SECRET = process.env.JWT_SECRET;

//Register new User -> save it in array 
exports.register = async (req, res) => {
    //validate if Registration request is valid
    const { error } = validateRegistration(req.body);
    //if , not throw en error
    if (error){
        return res.status(400).send(error.details[0].message)
    };
    
    //get username/pswd from req 
    const { username, password } = req.body;
    //check if array already have that user
    const existingUser = users.find(user => user.username === username)
    if (existingUser){
        return res.status(400).send("User already exists.");
    }

    // save hashed password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword, preferences: [] };
    users.push(newUser);
    console.log(users)
    res.status(201).send('User registered successfully.');
}


//Login for an existing user , generate a jwt token for that user 
exports.login = async (req, res) => {
    console.log(users)
    //validate if login request is valid
    const { error } = validateLogin(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
     //get username/pswd from req 
    const { username, password } = req.body;

    //check if username exist or not
    const existingUser = users.find(user => user.username === username)
    if (!existingUser){
        return res.status(400).send("Invalid username or password.");
    }

    //check if password is correct or not 
    const pwdcheck = await bcrypt.compare(password, existingUser.password);
    if (!pwdcheck) return res.status(400).send('Invalid username or password.');
    const token = jwt.sign({ 
        username: existingUser.username,
        preferences: existingUser.preferences 
    }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
}