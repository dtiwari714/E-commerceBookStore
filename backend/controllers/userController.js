const Errorhandler = require("../utils/errorhandler");
const catchAsyncError=require("../middleware/catchAsyncError");
const User=require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail=require("../utils/sendEmail")
const crypto=require("crypto");
const ErrorHandler = require("../utils/errorhandler");


//register A user

exports.registerUser=catchAsyncError(async(req,res,next)=>{
    const {name,email,password}=req.body;

    const user=await User.create({
        name,email,password,
        avatar:{
                public_id:"this is sample id",
                url:"profilepicURl"
        }
        });

        // const token=user.getJWTToken();
        // res.status(201).json({
        //     success:true,
        //     token
        // });
        sendToken(user,201,res);
});


// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});


//Logout User

exports.logout=catchAsyncError(async(req,res,next)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now()),
    httpOnly:true
  });
  
  
  res.status(200).json({
    success:true,
    message:"Looged Out"
  })
});

//Forgot Password

exports.forgotPassword=catchAsyncError(async(req,res,next)=>{
  const user=await User.findOne({email:req.body.email});

  if(!user){
    return next(new Errorhandler("User not Found",404));
  }

  //GEt ResetPassword token
  const resetToken = user.getResetPasswordToken();

  await user.save({validateBeforeSave:false});

  const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

  const message=`Your password reset token is :-\n\n ${resetPasswordUrl} \n\n If you have not requested this email please ignore it`;

  try{

    await sendEmail({
        email:user.email,
        subject:`Ecommerce Password Recovery`,
        message
    })
    res.status(200).json({
      success:true,
      message:`Email sent to ${user.email} successfully`
    })

  }catch(error){
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

  await user.save({validateBeforeSave:false});

  return next(new Errorhandler(error.message,500))

  }
})

//Reset password
exports.resetPassword=catchAsyncError(async(req,res,next)=>{
  //crating token hash
  const resetPasswordToken=crypto
  .createHash("sha256")
  .update(req.params.token)
  .digest("hex");

  const user=await User.findOne({
    resetPasswordToken,
    resetPasswordExpire:{$gt:Date.now()},
  });

  if(!user){
    return next(new Errorhandler("Reset password Token is invalid or has been expired",404));
  }
  if(req.body.password !== req.body.confirmPassword){
    return next(new Errorhandler("Password Does not matched",400));
  }

  user.password=req.body.password;
  user.resetPasswordToken=undefined;
  user.resetPasswordExpire=undefined;

  await user.save();
  sendToken(user,200,res);
});

//Get user detail
// This route only that people excess who is logged in
exports.getUserDetails = catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success:true,
    user,
  });
})

//Update User Password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

//Update user profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {

  const newUserData={
    name :req.body.name,
    email:req.body.email,
  }
  //we will add cloudinary later
  const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    userFindModify:false
  })

  res.status(200).json({
    success:true,
  });
});

//Get All Users details (admin) admin ko kisi ka bhi details dekhna ho.
exports.getAllUser = catchAsyncError(async(req,res,next)=>{
 const users = await User.find();

  res.status(200).json({
    success:true,
    users,
  });
});

//Get single User details (admin)
exports.getSingleUser = catchAsyncError(async(req,res,next)=>{
 const user = await User.findById(req.params.id);

 if(!user){
  return next(
    new ErrorHander(`User does not exist with Id:${req.params.id}`))
 }
  res.status(200).json({
    success:true,
    user,
  });
});

//Update User Role --Admin //Mtlb user ko admin me update karsakte hai.
exports.updateUserRole = catchAsyncError(async (req, res, next) => {

  const newUserData={
    name:req.body.name,
    email:req.body.email,
    role:req.body.role,
  }
  
  const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
    new:true,
    runValidators:true,
    userFindModify:false
  })

  res.status(200).json({
    success:true,
  });
});

//Delete User --Admin //Admin user ko delete karsakta hai.
exports.deleteUser = catchAsyncError(async (req, res, next) => {

  const user = await User.findById(req.params.id);
  //we will remove cloudinary later
  if(!user){
    return next (
      new ErrorHander(`User doesn't exist with Id: ${req.params.id}`,400)
    );
  }
  await User.findByIdAndDelete(req.params.id);
  
  res.status(200).json({
    success:true,
    message:"User deleted successfully",
  });
});
