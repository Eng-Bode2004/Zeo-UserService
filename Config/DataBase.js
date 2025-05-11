                                //  MongoDB Atlas Information
//********************************************************************************************//
                        // Account email-username : zezomodebode@gmail.com
                        // Account password : Zzz123123@#!@!#
                        // Project name : Zeo-Project
                        // Cluster name : Zeo
                        // Cluster Username : Zeo-platform
                        // Cluster Password : Zeo-Platform2025

const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://Zeo-platform:Zeo-Platform2025@cluster0.ddhjiir.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB Atlas
mongoose
    .connect(mongoURI)
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((error) => {
        console.error('MongoDB Connection error:', error);
    });

module.exports = mongoose;
