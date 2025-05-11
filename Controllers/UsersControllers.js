const UserService = require('../Services/UserServices');

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

    async uploadUserProfile(req,res){
        try {

            const {userId} = req.params;
            const {ImageURL} = req.body;
            if (!userId){
                res.status(400).json({
                    message:"User Id is missing",
                })
            }

            if (!ImageURL){
                res.status(400).json({
                    message:"Image URL is missing",
                })
            }

            const UserProfile = await UserService.uploadUserProfile(userId, ImageURL);
            res.status(200).json({
                message: 'User Profile was uploaded successfully.',
                user: UserProfile,
            })



        }

        catch (error) {
            res.status(400).json({
                message:"Failed to upload User",
                error: error.message,
            })
        }
    }
}

module.exports =new UsersController;
