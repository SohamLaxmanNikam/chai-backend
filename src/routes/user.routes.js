import {Router} from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken, ChangeCurrentPassword, getCurrentUser, updataAccountDetails, updateUserAvatar, getUserChannelProfile, getWatchHistory } from "../controllers/user.controllers.js";
import {upload} from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router =Router();

router.route("/register").post(
   upload.fields([
    {
        name:"avatar",
        maxCount:1
    },{
        name:"coverImage",
        maxCount:1
    }
   ]), 
    registerUser
)

router.route("/login").post(loginUser)

//secure routes
router.route("/logout").post(verifyJWT , logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT,ChangeCurrentPassword)

router.route("/current-user").get(verifyJWT,getCurrentUser)

router.route("/update-account").patch(verifyJWT, updataAccountDetails)

router.route("/avatar").patch(verifyJWT, upload.single("avatar") ,updateUserAvatar)

router.route("/c/:username").get(verifyJWT,getUserChannelProfile)

router.route("/histroy").get(verifyJWT,getWatchHistory)

export default router;