const User = require('../models/userModel');

const asyncHandler = require('express-async-handler');
const generateToken = require('../util/generateToken.js');

const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password, university, course } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(404)
        throw new Error('User already exists');
    }
    const user = await User.create({
        name,
        email,
        password,
        university,
        course,
    });


    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            university: user.university,
            course: user.course,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Error occured')
    }


});

const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            university: user.university,
            course: user.course,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error("User not Found!");
    }
});

module.exports = { registerUser, authUser, updateUserProfile };