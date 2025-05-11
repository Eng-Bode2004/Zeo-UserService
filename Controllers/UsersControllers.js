const UserService = require('../services/UserServices');

class UsersController {
    async registerUser(req, res) {
        try {
            const {firstName, lastName, email , phoneNumber , password , confirmPassword , username}= req.body;


            const userData = {firstName, lastName, email , phoneNumber , password , confirmPassword , username};
            const newUser = await UserService.registerUser(userData);
            res.status(200).json({
                message: 'User registered successfully.',
                user: newUser,
            });
        }

        catch(error) {
            res.status(400).json({
                message:"Failed to register User",
                error: error.message,
            })
        }

    }

}

module.exports =new UsersController;
