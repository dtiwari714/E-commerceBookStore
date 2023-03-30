const app=require("./app")
const dotenv=require("dotenv")
const connectDatabase=require("./config/database")

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

//COnfig we have decalre to know the where the dotenv file is
dotenv.config({path:"backend/config/config.env"})


//connting with database

connectDatabase();


const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

//handle unhandleed error
process.on("unhandledRejection",(err)=>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to unhandled error`);

    server.close(()=>{
        process.exit(1);
    });
});