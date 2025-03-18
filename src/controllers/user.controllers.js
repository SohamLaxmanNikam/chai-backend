import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import e from "express";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from  "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res)=>{
    // get user details from frontend
    //validation-not empty
    //check if user already exists:username ,email
    //check for images, check for avater
    //upload them to cloudniry , avatar
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation 
    // return res
    const {fullName,email,username,password}=req.body;
   
    if(
        [fullName,email,username,password].some((field)=>field?.trim()==="")

    ){
        throw new ApiError (4000,"All fields are required")

    }
    const extiedUser =  User.findOne({
        $or:[ { username} , { email }]
    })
    
    
    if(extiedUser){
        throw new ApiError(409, "User with email or username alerady exists");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverLocalpath = req.field?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const  coverImage = await uploadOnCloudinary(coverLocalpath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    const user =await User.create({
        fullName,
        avatar: avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    const craeteduser= await User.findById(user._id).select(
        "-password -refreshToken" 
    )
    if(!craeteduser){
        throw new ApiError(500,"Something went wrong while registring the user ")
    }

    return res.status(201).json(
        new ApiResponse(200,craeteduser,"User registered Successfully")
    )


})

export {registerUser};