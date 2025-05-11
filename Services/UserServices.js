const User = require("../Models/Users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const sgMail = require("@sendgrid/mail");
const mongoose = require("mongoose");
require('dotenv').config();


class UserServices {
    async registerUser(userData) {
        const { firstName, lastName, email , phoneNumber , password , confirmPassword , username } = userData;

        // make sure that all important Fields are required
        if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword || !username ) {
            return Promise.reject(new Error("Please enter All Fields Required"));
        }

        // Check if Username exits
        const existUsername =await User.findOne({username:username});
        if (existUsername) {
            return Promise.reject(new Error("Username already exists"));
        }

        // Check if Email Exists
        const existEmail = await User.findOne({ email:email });
        if (existEmail) {
            return Promise.reject(new Error("Email already exists"));
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return Promise.reject(new Error("Passwords don't match"));
        }

        // Make Sure That is Strong Password
        const StrongPassword = validator.isStrongPassword(password);
        if (!StrongPassword) {
            return Promise.reject(new Error("Password is not strong enough"));
        }


        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Make Email Lower Case
        const LowerCaseEmail =email.toLowerCase();

        // Create new User
        const newUser = new User({
            firstName,
            lastName,
            email:LowerCaseEmail,
            phoneNumber,
            password: hashedPassword,
            username,
        })
        return await newUser.save();
    }




}

module.exports =new UserServices;