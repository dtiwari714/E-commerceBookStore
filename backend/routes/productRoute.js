const express=require("express");
const { getAllProducts,
    createProduct, 
    updateProducts, 
    deleteProducts, 
    getProductsDetails,
    createProductReview,
    getProductReviews,
    deleteReview
} = require("../controllers/productContoller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router=express.Router();

router.route("/products").get(getAllProducts);

router
.route("/admin/products/new")
.post(isAuthenticatedUser, authorizeRoles("admin"),createProduct)
router
.route("/admin/products/:id")
.put(isAuthenticatedUser, authorizeRoles("admin"),updateProducts)
.delete(isAuthenticatedUser, authorizeRoles("admin"),deleteProducts)

router.route("/products/:id").get(getProductsDetails);

//Product review 
router.route("/review").put(isAuthenticatedUser,createProductReview)

router
.route("/reviews")
.get(getProductReviews) //yaha pe isAuthentication nhi lagaya bcz reviews bina login ke bhi dekh sakte hai.
.delete(isAuthenticatedUser,deleteReview)

module.exports=router;