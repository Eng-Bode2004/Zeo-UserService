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


    async uploadUserProfile(userId, ImageURL) {
        try {
            if (!userId){
                return Promise.reject(new Error("User Id is missing"));
            }

            if (!ImageURL){
                return Promise.reject(new Error("Image is missing"));
            }

            // Corrected line here
            const existUser = await User.findById(userId);
            if (!existUser) {
                return Promise.reject(new Error("User not Found"));
            }

            return User.findByIdAndUpdate(userId, { $set: { profileImage: ImageURL } }, { new: true });
        }catch (error) {
            return Promise.reject(error);
        }
    }

    async assignRule(userId, ruleId) {
        try {
            if (!userId || !ruleId) {
                return Promise.reject(new Error("Please enter All Fields Required"));
            }

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return Promise.reject(new Error("Invalid UserID"));
            }

            if (!mongoose.Types.ObjectId.isValid(ruleId)) {
                return Promise.reject(new Error("Invalid Rule ID"));
            }

            const newUser = await User.findByIdAndUpdate(userId, {$set:{Rule: ruleId}},{new: true});

            if (!newUser) {
                return Promise.reject(new Error("Invalid UserID"));
            }
            return newUser;
        }

        catch (error) {
            throw error;
        }
    }


    async loginUser(userData) {

        try {

            const { email, password } = userData;
            if (!email || !password) {
                return Promise.reject(new Error("Please enter All Fields Required"));
            }

            // Check if user exists
            const existUser = await User.findOne({email: email});
            if (!existUser) {
                return Promise.reject(new Error("Invalid email"));
            }


            // Validate Password
            const ValidPass = await bcrypt.compare(password, existUser.password);
            if (!ValidPass || !existUser) {
                return Promise.reject(new Error("Invalid email or Password"));
            }

            // Generate Token : Header . Payload . Signature
            // Payload: main Data You store in The Token

            const token = jwt.sign(
                {
                    userId:existUser._id,
                    ruleId:existUser.Rule._id,
                },
                process.env.JWT_SECRET,

                {expiresIn: "1h"}
            );

            return {
                token: token,
                user:{
                    userId:existUser._id,
                    username:existUser.username,
                    email:existUser.email,
                    ruleID:existUser.Rule
                }
            };


        }

        catch (error) {
            throw error;
        }

    }

    async uploadAddress(userId, addressId) {
        try {
            if (!userId) {
                return Promise.reject(new Error("Please enter userId Required"));
            }
            if (!addressId) {
                return Promise.reject(new Error("Please enter addressId required"));
            }
            return User.findByIdAndUpdate(userId,{$set:{Address:addressId}},{new:true});


        }
        catch (error) {
            throw error;
        }
    }

}

module.exports =new UserServices;