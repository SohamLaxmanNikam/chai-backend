import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";


// const registerUser = asyncHandler(async(req,res)=>{
//     // get user details from frontend
//     //validation-not empty
//     //check if user already exists:username ,email
//     //check for images, check for avater
//     //upload them to cloudniry , avatar
//     //create user object - create entry in db
//     //remove password and refresh token field from response
//     //check for user creation 
//     // return res
//     const {fullName,email,username,password}=req.body;
   
//     if(
//         [fullName,email,username,password].some((field)=>field?.trim()==="")

//     ){
//         throw new ApiError (4000,"All fields are required")

//     }
//     const extiedUser =await  User.findOne({
//         $or:[ { username} , { email }]
//     })
    
    
//     if(extiedUser){
//         throw new ApiError(409, "User with email or username alerady exists");
//     }

//     const avatarLocalPath = req.files?.avatar[0]?.path;
//     const coverLocalpath = req.files?.coverImage[0]?.path;

//     if(!avatarLocalPath){
//         throw new ApiError(400,"Avatar file is required")
//     }

//     const avatar = await uploadOnCloudinary(avatarLocalPath)
//     const  coverImage = await uploadOnCloudinary(coverLocalpath)

//     if(!avatar){
//         throw new ApiError(400,"Avatar file is required")
//     }

//     const user =await User.create({
//         fullName,
//         avatar: avatar.url,
//         coverImage:coverImage?.url || "",
//         email,
//         password,
//         username:username.toLowerCase()
//     })

//     const craeteduser= await User.findById(user._id).select(
//         "-password -refreshToken" 
//     )
//     if(!craeteduser){
//         throw new ApiError(500,"Something went wrong while registring the user ")
//     }

//     return res.status(201).json(
//         new ApiResponse(200,craeteduser,"User registered Successfully")
//     )


// })


const registerUser = asyncHandler( async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    const {fullName, email, username, password } = req.body
    //console.log("email: ", email);
     console.log(fullName, email, username, password )

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    //console.log(req.files);

    let avatarLocalPath;
    console.log(req.files)
    if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        avatarLocalPath = req.files.avatar[0].path;

    }
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }
    if (!coverImageLocalPath) {
        throw new ApiError(400, "CoverImage  file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
   

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} )

export { registerUser };
