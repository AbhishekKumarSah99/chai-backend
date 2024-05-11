import  asyncHandler  from "../utils/asyncHandler.js";
import ApiError  from "../utils/ApiError.js";
import User from "../models/user.models.js"
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req,res)=>{
   //get user detail from frontend
    //validation detail
    //chaeck if user already exist:username,email
    //check fro images ,check fro avatar
    //upload it to cloudinary,avatr
    //cretae user object--create entry in db
    //remoe password and refresh token field from response
    //check for user creation
    //return res

    const {fullname,email,username,password}=req.body
    console.log("email:",email);

    /*
    if you follow this process to check than its correct but more lines of codes will be required so we have a smillar and another way to check all the codition in one line 
    if(fullname===""){
        throw new ApiError(400,"fullname is required")
    }*/

    if(
        [fullname,email,username,password].some((field)=>field?.trim==="")
    ){
        throw new ApiError(400,"all fields are required")
    }

  const existedUser=  User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"user with email or username already exists")
    }

   const avatarLocalPath= req.files?.avatar[0]?.path;
   const coverImagePath=req.files?.coverImage[0]?.path;

   if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
   }

   const avatar=await uploadOnCloudinary(avatarLocalPath)
   const coverImage=await uploadOnCloudinary(coverImagePath)

   if(!avatar){
    throw new ApiError(400,"Avatar file is required")
   }

  const user= await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage.url || "",
    email,password,
    username:username.toLowerCase()
   })

   const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
   )

   if(!createdUser){
    throw new ApiError(500,"somethong went wrong while regeistring ")
   }

   return res.status(201).json(
    new ApiResponse(200,createdUser,"user registered successfully")
   )
})

export default  registerUser