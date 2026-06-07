const Lead = require("../models/Lead")
const createLead = async (req, res) => {
    try {
        // get request data
        const leadData = req.body;
        // save to database
        const newLead = await Lead.create(leadData);
        // return saved document
        res.status(201).json({
            message: "Data received successfully!",
            data: newLead
        })

    } catch (error) {
        // return error response
        res.status(500).json({
            message: "Data not received!",
            error: error.message
        })
    }
};

const getLeads = async (req, res) => {
    try{
        const allLeads = await Lead.find();
        if(allLeads.length === 0 ){
            return res.status(200).json({
            message: "Data fetched successfully!",
            "count": allLeads.length,
            "data": allLeads
        });
        }
            return res.status(200).json({
            message: "Data fetched successfully!",
            count: allLeads.length,
            data: allLeads
        });
        }
        catch(error){
        res.status(500).json({
            message: "Unable to fetch data!",
            error: error.message
        });
    }
};

module.exports = {
    createLead, getLeads
};