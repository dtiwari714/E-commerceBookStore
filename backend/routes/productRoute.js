const express=require("express");
const { getAllProducts,createProduct, updateProducts, deleteProducts, getProductsDetails } = require("../controllers/productContoller");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router=express.Router();

router.route("/products").get(getAllProducts)
router.route("/products/new").post(isAuthenticatedUser, authorizeRoles("admin"),createProduct)
router.route("/products/:id").put(isAuthenticatedUser, authorizeRoles("admin"),updateProducts)
router.route("/products/:id").delete(isAuthenticatedUser, authorizeRoles("admin"),deleteProducts)
router.route("/products/:id").get(getProductsDetails)
module.exports=router