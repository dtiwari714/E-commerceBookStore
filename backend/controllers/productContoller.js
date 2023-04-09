const Product=require("../models/productModels");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncError=require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");



//Create Product ---Admin
exports.createProduct=catchAsyncError(async(req,res,next)=>{
    req.body.user=req.user.id
    
    const product=await Product.create(req.body);
    res.status(200).json({
        status:true,
        product
    });
});
//get Products Details
exports.getProductsDetails=catchAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    // if(!product){
    //     // return res.status(500).json({
    //     //     status:false,
    //     //     message:"Products not found"
    //     // })
    //     return next(new Errorhandler("Product not Found",404));
    // }
    if (!product) {
        return next(new Errorhandler("Product not found", 404));
      }
    res.status(200).json({
        status:true,
        product,
        // productCount
    });
});
//Update Products
exports.updateProducts=catchAsyncError(async(req,res,next)=>{
    let product=await Product.findById(req.params.id);
        if(!product){
            return res.status(500).json({
                status:false,
                message:"Products not found"
            })    
        }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        useFindAndModify:false,
        runValidators:true
    })
    res.status(200).json({
        status:true,
        product,
        message:"Product update Done Successfully"
    })
});
//delete products
exports.deleteProducts=catchAsyncError(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        req.status(500).json({
            status:false,
            message:"Products not found"
        })
    };
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        product,
        message:"Product is Deleted Successfully"
    });
});
//GetAll products
// exports.getAllProducts =catchAsyncError(async (req, res) => {
//     const apiFeatures=new ApiFeatures(Product.find(),req.query)
//     .search()
//     .filter();
//     //const product=await Product.find();
//     const product=await ApiFeatures.query;
//     res.status(200).json({ success:true,product});
// });

// Get All Product
exports.getAllProducts =catchAsyncError(async (req, res,next) => {

    //return next(new Errorhandler("This is my Temp error",500));
    const resultPerPage=8;
    const productCount= await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    let products = await apiFeature.query;
  
    //products = await apiFeature.query;
  
    res.status(200).json({
      success: true,
      products,
      productCount
    });
  });
  