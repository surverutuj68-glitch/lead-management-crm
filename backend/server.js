const express = require ('express');
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

const port = process.env.PORT || 3000 ;

app.get('/',(req,res)=>{
    res.status(200).json({
        message: "CRM API running"
    });
});

const startServer = async () => {
    try{
        await connectDB();
        app.listen(port, ()=>{
        console.log(`app running on port : ${port}`);
        });
    }
    catch(error){
        console.error(error);
    }
    
};

startServer();