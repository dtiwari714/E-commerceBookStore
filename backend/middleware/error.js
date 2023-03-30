const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //cast error wrong id error
  if(err.name=="CastError"){
    const message=`Resouce not found ${err.path}`;
    err= new ErrorHandler(message,400)
  }

  //Mongoose duplicate key error
  if(err.code===11000){
    const message=`Duplicate  ${Object.keys(err.keyValue)} entered`;
    err=new ErrorHandler(message,400);
  }

    //JWT wrong error
    if(err.name==="JsonWebTokenError"){
      const message=`Json Web TOken is invalid ,try again`;
      err=new ErrorHandler(message,400);
    }

        //JWT Expire error
        if(err.name==="TokenExpireError"){
          const message=`Json Web TOken is Expired ,try again`;
          err=new ErrorHandler(message,400);
        }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};