const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../middleware/auth');

exports.getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.json(users);
};

exports.getProfile = (req, res) => {
    User.findById(req.user._id)
      .then(user => {
        console.log(user);
        res.json(user);
      })
      .catch(err => {
        console.error('Error: ' + err);
        res.status(500).json('Error: ' + err);
      });
};

exports.register = async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password must match confirm password" });
        }
        
        const user = await User.create({ email, password });
        req.user = user; // Set req.user to the newly created user
        const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie("token", token, { 
            withCredentials: true,
            sameSite: 'none',
            httpOnly: false 
        });

        res.json({ message: "User registered", user: user, status: 201 });
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: "Invalid login credentials" });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie("token", token, { 
            withCredentials: true,
            sameSite: 'none',
            httpOnly: false 
        });

        res.json({ message: "User logged in", token: token, status: 201 });
    } catch (error) {
        console.log(error);
    }
};