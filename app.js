// Connect To DataBase
const MongoDB = require('./Config/DataBase');
const mongoose = require("mongoose"); // Data Base Configrations
const express = require('express');


// Set Up Port and Make Server listen To requests
const app = express();
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
app.use(express.json()); // Middleware to parse JSON

// Users Routes //
UserRoutes = require('./Routes/UsersRoutes');
app.use('/api/users',UserRoutes);