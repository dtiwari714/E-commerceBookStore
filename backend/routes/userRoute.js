const express=require("express")
const {registerUser,
     loginUser, 
     logout, 
     forgotPassword, 
     resetPassword,
     getUserDetails,
     updatePassword,
     updateProfile,
     getAllUser,
     getSingleUser,
     updateUserRole,
     deleteUser
}=require("../controllers/userController")

const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth");


const router=express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);


router.route("/logout").get(logout);

//After Loggedin Get User Details
router.route("/me").get(isAuthenticatedUser,getUserDetails)

//Update and change password
router.route("/password/update").put(isAuthenticatedUser,updatePassword)

//update user profile email and name
router.route("/me/update").put(isAuthenticatedUser,updateProfile);

//Get AllUserDetails By Admin /means admin saare users ka details dekh sakta hai.
router
.route("/admin/users") 
.get(isAuthenticatedUser,authorizeRoles("admin"),getAllUser);

// Get SingleUser Details By Admin / means admin single user ka details dekh sakta hai.
router
.route("/admin/user/:id")
.get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser)
.put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser)

module.exports = router;