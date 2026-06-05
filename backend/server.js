const express = require ('express');
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000 ;

app.get('/',(req,res)=>{
    res.status(200).json({
        message: "CRM API running"
    });
});

app.listen(port, ()=>{
    console.log(`app running on port : ${port}`);
});