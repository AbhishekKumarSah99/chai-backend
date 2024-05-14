import { Router } from "express";
import UserController from "../controllers/user.controller.js"; // Import the object

// Destructure the functions from the object

import upload from "../middlewares/multer.middleware.js";
import  verifyJWT  from "../middlewares/auth.middleware.js";

const { registerUser, loginUser, logoutUser,refreshAccessToken,changeCurrentPassword,getCurrentUser ,updateAccountDetail,updateUserAvatar,updateUserCoverImage} = UserController;
const router=Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverimage",
            maxCount:1
        }
    ]),
    registerUser)

    router.route("/login").post(loginUser)

    router.route("/logout").post(verifyJWT,logoutUser)
    router.route("/refresh-token").post(refreshAccessToken)
    


export default router