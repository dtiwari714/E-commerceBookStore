const express=require("express");
const ErrorHandler = require("./utils/errorhandler");
const cookieParser=require("cookie-parser")
const errorMiddleware=require("./middleware/error")

const app=express();
app.use(express.json());
app.use(cookieParser());

//Route Imports
const product=require("./routes/productRoute");
const user=require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use('/api/v1',product);
app.use('/api/v1',user);

app.use("/api/v1",order);

//Miidleware for Error
app.use(errorMiddleware)


module.exports=app