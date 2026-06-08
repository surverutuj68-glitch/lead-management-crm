const express = require ('express');
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const leadRoutes = require("./routes/leadRoutes");

const app = express();
app.use(cors());
app.use(express.json());

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

app.use("/api/leads", leadRoutes);

startServer();