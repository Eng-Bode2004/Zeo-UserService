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

    async assignUser(req, res) {
        try {
            const { userId } = req.params;  // Changed to 'id' to match route parameter
            const { ruleId } = req.body;
            if (!ruleId) {
                return res.status(400).json({
                    error: 'Rule ID is required in request body'
                });
            }

            const updatedUser = await UserService.assignRule(userId, ruleId);

            res.status(200).json({
                status: 'success',
                message: 'Rule assigned successfully.',
                user: updatedUser
            });
        } catch (error) {
            res.status(400).json({
                status: 'failure',
                error: error.message
            });
        }
    }


    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    status: 'failure',
                    message: 'Email and Password are required'
                })
            }
            const userData = {email, password};
            const existUser = await UserService.loginUser(userData);
            res.status(200).json({
                status: 'success',
                message: 'User login successfully.',
                user: existUser
            })

        }

        catch (error){
            res.status(400).json({
                error: error.message,
            })
        }
    }

}

module.exports =new UsersController;
